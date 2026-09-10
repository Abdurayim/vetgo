/* Home page: capture location, list nearby vets, render cards. */

initPage();

const resultsEl = document.getElementById("results");
const noticeEl = document.getElementById("notice");
const titleEl = document.getElementById("listTitle");
const countEl = document.getElementById("listCount");
const locateBtn = document.getElementById("locateBtn");

function skeletons(n = 6) {
  resultsEl.innerHTML = Array.from({ length: n })
    .map(
      () => `<div class="skeleton-card">
        <div class="sk-photo"></div>
        <div class="sk-line"></div>
        <div class="sk-line short"></div>
      </div>`
    )
    .join("");
}

function renderVets(vets, { located }) {
  const count = vets.length ? I18N.vetCount(vets.length) : "";
  countEl.textContent = located && vets.length ? `${count} · ${t("home.nearestFirst")}` : count;
  titleEl.textContent = located ? t("home.listTitleNear") : t("home.listTitleAll");

  if (!vets.length) {
    resultsEl.innerHTML = `
      <div class="state">
        <div class="state-art" aria-hidden="true"></div>
        <h3>${t("home.empty.title")}</h3>
        <p>${t("home.empty.html")}</p>
      </div>`;
    return;
  }
  resultsEl.innerHTML = vets.map((v) => vetCard(v)).join("");
}

function showNotice(html) {
  noticeEl.innerHTML = html;
}

function banner(html) {
  return `
    <div class="banner">
      ${icon("pin", 22)}
      <span>${html}</span>
      <button class="btn btn-outline btn-sm" type="button" onclick="locate()">${t("common.tryAgain")}</button>
    </div>`;
}

async function load(coords) {
  skeletons();
  try {
    const vets = await API.listVets(coords?.lat, coords?.lng);
    renderVets(vets, { located: !!coords });
  } catch (err) {
    resultsEl.innerHTML = `
      <div class="state">
        <div class="state-icon">${icon("alert", 34)}</div>
        <h3>${t("home.error.title")}</h3>
        <p>${escapeHtml(err.message)}</p>
      </div>`;
  }
}

async function locate() {
  locateBtn.disabled = true;
  const original = locateBtn.innerHTML;
  locateBtn.innerHTML = `<span class="spinner"></span> ${t("common.locating")}`;
  showNotice("");
  try {
    const coords = await getLocation();
    await load(coords);
  } catch (err) {
    // No position from the browser: sort by the approximate location of the
    // visitor's IP address instead, and say so.
    const tip = IN_APP_BROWSER ? " " + t("loc.inApp") : "";
    const approx = await approximateLocation();
    if (approx) {
      const text = approx.city
        ? t("home.banner.approx", { city: escapeHtml(approx.city) })
        : t("home.banner.approxNoCity");
      showNotice(banner(`${text}${tip} <a class="geo-credit" href="https://db-ip.com" target="_blank" rel="noopener">IP Geolocation by DB-IP</a>`));
      await load({ lat: approx.latitude, lng: approx.longitude });
    } else {
      const denied = err && err.code === 1; // PERMISSION_DENIED
      showNotice(banner((denied ? t("home.banner.denied") : t("home.banner.error")) + tip));
      await load(null);
    }
  } finally {
    locateBtn.disabled = false;
    locateBtn.innerHTML = original;
  }
}

locateBtn.addEventListener("click", locate);

// Auto-attempt geolocation on first load; falls back gracefully on denial.
locate();
