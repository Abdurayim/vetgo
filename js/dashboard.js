/* Dashboard: auth-gated; load own profile, edit, save (incl. photo + location). */

document.getElementById("header").innerHTML = renderHeader();
document.getElementById("footer").innerHTML = renderFooter();
I18N.apply();

// Auth gate.
if (!Auth.isLoggedIn) {
  location.href = "login.html";
}

const msgEl = document.getElementById("msg");
const loadingEl = document.getElementById("loading");
const form = document.getElementById("profileForm");
const submitBtn = document.getElementById("submitBtn");
const locBtn = document.getElementById("locBtn");
const locStatus = document.getElementById("locStatus");
const latEl = document.getElementById("latitude");
const lngEl = document.getElementById("longitude");
const photoEl = document.getElementById("photo");
const currentPhoto = document.getElementById("currentPhoto");
const viewPublic = document.getElementById("viewPublic");

function showMsg(text, type = "error") {
  msgEl.textContent = text;
  msgEl.className = `form-msg ${type}`;
  if (type === "success") setTimeout(() => (msgEl.className = "form-msg"), 2500);
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  Auth.clear();
  location.href = "index.html";
});

function fill(vet) {
  form.full_name.value = vet.full_name || "";
  form.profession.value = vet.profession || "";
  form.description.value = vet.description || "";
  form.phone.value = vet.phone || "";
  latEl.value = vet.latitude;
  lngEl.value = vet.longitude;
  locStatus.textContent = t("loc.current", {
    lat: Number(vet.latitude).toFixed(4),
    lng: Number(vet.longitude).toFixed(4),
  });
  if (vet.photo_path) {
    currentPhoto.src = photoUrl(vet.photo_path);
    currentPhoto.classList.remove("hidden");
  } else {
    currentPhoto.classList.add("hidden");
  }
  viewPublic.href = `vet.html?id=${vet.id}`;
}

// Live preview when picking a new photo.
photoEl.addEventListener("change", () => {
  const file = photoEl.files[0];
  if (file) {
    currentPhoto.src = URL.createObjectURL(file);
    currentPhoto.classList.remove("hidden");
  }
});

// Update location.
locBtn.addEventListener("click", async () => {
  locStatus.textContent = t("common.locating");
  locStatus.className = "location-status";
  try {
    const { lat, lng } = await getLocation();
    latEl.value = lat;
    lngEl.value = lng;
    locStatus.textContent = t("loc.updated", { lat: lat.toFixed(4), lng: lng.toFixed(4) });
    locStatus.className = "location-status ok";
  } catch (err) {
    const denied = err && err.code === 1;
    locStatus.textContent = denied ? t("loc.deniedShort") : t("loc.failedShort");
    locStatus.className = "location-status";
  }
});

// Submit.
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;

  const original = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="spinner"></span> ${t("dash.saving")}`;
  msgEl.className = "form-msg";

  // Build payload; only include photo if a new one was chosen.
  const fd = new FormData();
  fd.append("full_name", form.full_name.value);
  fd.append("profession", form.profession.value);
  fd.append("description", form.description.value);
  fd.append("phone", form.phone.value);
  fd.append("latitude", latEl.value);
  fd.append("longitude", lngEl.value);
  if (photoEl.files[0]) fd.append("photo", photoEl.files[0]);

  try {
    const updated = await API.updateMe(fd);
    fill(updated);
    photoEl.value = "";
    showMsg(t("dash.saved"), "success");
  } catch (err) {
    showMsg(err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = original;
  }
});

// Initial load.
(async () => {
  try {
    const vet = await API.getMe();
    fill(vet);
    loadingEl.classList.add("hidden");
    form.classList.remove("hidden");
  } catch (err) {
    // request() already redirects on 401; show other errors.
    loadingEl.classList.add("hidden");
    showMsg(err.message);
  }
})();
