/* Shared API client + small helpers, used by every page. */

const API_BASE = `${API_ORIGIN}/api`; // API_ORIGIN comes from config.js
const TOKEN_KEY = "vetnear_token";

const Auth = {
  get token() {
    return localStorage.getItem(TOKEN_KEY);
  },
  set(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
  get isLoggedIn() {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

/* Thin fetch wrapper that throws an Error(message) on non-2xx responses. */
async function request(path, { method = "GET", body, auth = false, json } = {}) {
  const headers = {};
  if (auth && Auth.token) headers["Authorization"] = `Bearer ${Auth.token}`;

  let payload = body;
  if (json !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(json);
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { method, headers, body: payload });
  } catch {
    // Network/connection failure — fetch rejects before any response.
    throw new Error(t("err.network"));
  }

  // 401 on an authenticated call → token is dead; bounce to login.
  if (res.status === 401 && auth) {
    Auth.clear();
    if (!location.pathname.endsWith("login.html")) {
      location.href = "login.html";
    }
    throw new Error(t("err.session_expired"));
  }

  let data = null;
  const text = await res.text();
  if (text) {
    try { data = JSON.parse(text); } catch { /* non-JSON */ }
  }

  if (!res.ok) {
    // Prefer the localized message for the backend's error code; fall back to
    // the server's English message, then a generic error.
    const msg = I18N.tError(data && data.code, data && data.error);
    throw new Error(msg);
  }
  return data;
}

const API = {
  // Public
  listVets: (lat, lng) => {
    const q = lat != null && lng != null ? `?lat=${lat}&lng=${lng}` : "";
    return request(`/vets${q}`);
  },
  getVet: (id) => request(`/vets/${id}`),
  geoip: () => request(`/geoip?lang=${encodeURIComponent(I18N.lang)}`),

  // Auth
  register: (formData) => request("/auth/register", { method: "POST", body: formData }),
  login: (email, password) => request("/auth/login", { method: "POST", json: { email, password } }),

  // Authenticated self-service
  getMe: () => request("/me", { auth: true }),
  updateMe: (formData) => request("/me", { method: "PUT", body: formData, auth: true }),
};

/* ---------- Generic UI helpers ---------- */

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function photoUrl(path) {
  return path ? API_ORIGIN + path : null; // backend returns "/uploads/.."
}

/* "0.8 km away", or "0.8 km" with { short: true } for badges. */
function formatDistance(km, { short = false } = {}) {
  if (km == null) return null;
  const suffix = short ? "Short" : "";
  if (km < 1) return t("dist.m" + suffix, { n: Math.round(km * 1000) });
  return t("dist.km" + suffix, { n: km });
}

/* In-app browsers (Telegram, Instagram, Facebook, Android WebViews) often block location. */
const IN_APP_BROWSER = /Telegram|Instagram|FBAN|FBAV|Line\/|; wv\)/i.test(navigator.userAgent);

/* Browser geolocation. A quick network-based fix and a GPS fix are requested
   together: the promise resolves with whichever arrives first ({lat, lng,
   accuracy} in metres) and onRefine receives a later, more accurate one.
   Rejects with {code} (GeolocationPositionError codes, 0 = unsupported) only
   when both attempts fail. */
function getLocation({ onRefine } = {}) {
  if (!navigator.geolocation) return Promise.reject({ code: 0 });
  return new Promise((resolve, reject) => {
    let best = null;
    let pending = 2;
    let failure = null;
    const onPosition = (pos) => {
      pending--;
      const fix = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy };
      if (!best) {
        best = fix;
        resolve(fix);
      } else if (fix.accuracy < best.accuracy) {
        best = fix;
        if (onRefine) onRefine(fix);
      }
    };
    const onError = (err) => {
      pending--;
      if (!failure || err.code === 1) failure = err; // a denial explains more than a timeout
      if (pending === 0 && !best) reject(failure);
    };
    const geo = navigator.geolocation;
    geo.getCurrentPosition(onPosition, onError, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
    geo.getCurrentPosition(onPosition, onError, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
  });
}

/* Approximate {latitude, longitude, city} for the visitor's IP address from our
   API, or null when unavailable. Used when the browser can't locate. */
async function approximateLocation() {
  try {
    return await API.geoip();
  } catch {
    return null;
  }
}

/* "±40 m" / "±2.5 km" for a position's accuracy radius. */
function formatAccuracy(m) {
  return "±" + (m < 1000 ? t("dist.mShort", { n: Math.round(m) }) : t("dist.kmShort", { n: (m / 1000).toFixed(1) }));
}

/* Localized explanation for a getLocation() failure. */
function locationErrorMessage(err) {
  switch (err && err.code) {
    case 1: return t("loc.denied");
    case 2: return t("loc.unavailable");
    case 3: return t("loc.timeout");
    default: return t("loc.unsupported");
  }
}

/* Small transient toast. */
function toast(message) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2200);
}

