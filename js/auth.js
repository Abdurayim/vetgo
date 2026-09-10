/* Handles both the registration form and the login form (whichever is present). */

document.getElementById("header").innerHTML = renderHeader();
document.getElementById("footer").innerHTML = renderFooter();
I18N.apply();

// Already logged in? Skip the forms.
if (Auth.isLoggedIn) {
  location.href = "dashboard.html";
}

const msgEl = document.getElementById("msg");

function showMsg(text, type = "error") {
  msgEl.textContent = text;
  msgEl.className = `form-msg ${type}`;
}
function clearMsg() {
  msgEl.className = "form-msg";
  msgEl.textContent = "";
}

function withLoading(btn, label, fn) {
  return async (...args) => {
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> ${label}`;
    try {
      await fn(...args);
    } finally {
      btn.disabled = false;
      btn.innerHTML = original;
    }
  };
}

/* ------------------------- Registration ------------------------- */
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  const locBtn = document.getElementById("locBtn");
  const locStatus = document.getElementById("locStatus");
  const latEl = document.getElementById("latitude");
  const lngEl = document.getElementById("longitude");
  const photoEl = document.getElementById("photo");
  const photoPreview = document.getElementById("photoPreview");
  const submitBtn = document.getElementById("submitBtn");

  // Photo preview
  photoEl.addEventListener("change", () => {
    const file = photoEl.files[0];
    if (file) {
      photoPreview.src = URL.createObjectURL(file);
      photoPreview.classList.remove("hidden");
    } else {
      photoPreview.classList.add("hidden");
    }
  });

  // Capture location
  locBtn.addEventListener("click", async () => {
    locStatus.textContent = t("common.locating");
    locStatus.className = "location-status";
    try {
      const { lat, lng } = await getLocation();
      latEl.value = lat;
      lngEl.value = lng;
      locStatus.textContent = t("loc.set", { lat: lat.toFixed(4), lng: lng.toFixed(4) });
      locStatus.className = "location-status ok";
    } catch (err) {
      const denied = err && err.code === 1;
      locStatus.textContent = denied ? t("loc.denied") : t("loc.failed");
      locStatus.className = "location-status";
    }
  });

  const submit = withLoading(submitBtn, t("reg.creating"), async () => {
    clearMsg();
    if (!latEl.value || !lngEl.value) {
      showMsg(t("reg.needLocation"));
      return;
    }
    const fd = new FormData(registerForm);
    try {
      const { token } = await API.register(fd);
      Auth.set(token);
      location.href = "dashboard.html";
    } catch (err) {
      showMsg(err.message);
    }
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!registerForm.reportValidity()) return;
    submit();
  });
}

/* ---------------------------- Login ----------------------------- */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  const submitBtn = document.getElementById("submitBtn");

  const submit = withLoading(submitBtn, t("login.loggingIn"), async () => {
    clearMsg();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;
    try {
      const { token } = await API.login(email, password);
      Auth.set(token);
      location.href = "dashboard.html";
    } catch (err) {
      showMsg(err.message);
    }
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!loginForm.reportValidity()) return;
    submit();
  });
}
