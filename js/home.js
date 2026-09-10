/* Home page: capture location, list nearby vets, render cards. */

document.getElementById("header").innerHTML = renderHeader();
document.getElementById("footer").innerHTML = renderFooter();
I18N.apply();

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

function vetCard(v) {
  const dist = formatDistance(v.distance_km);
  const photo = photoUrl(v.photo_path);
  return `
    <a class="card" href="vet.html?id=${v.id}">
      <div class="card-photo">
        ${dist ? `<span class="distance-badge">📍 ${dist}</span>` : ""}
        ${
          photo
            ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(v.full_name)}" loading="lazy" />`
            : `<div class="placeholder">🐾</div>`
        }
      </div>
      <div class="card-body">
        <span class="profession">${escapeHtml(v.profession)}</span>
        <h3>${escapeHtml(v.full_name)}</h3>
        ${v.description ? `<p class="card-desc">${escapeHtml(v.description)}</p>` : ""}
      </div>
    </a>`;
}

function renderVets(vets, { located }) {
  countEl.textContent = vets.length ? I18N.vetCount(vets.length) : "";
  titleEl.textContent = located ? t("home.listTitleNear") : t("home.listTitleAll");

  if (!vets.length) {
    resultsEl.innerHTML = `
      <div class="state" style="grid-column:1/-1">
        <div class="emoji">🐾</div>
        <h3>${t("home.empty.title")}</h3>
        <p>${t("home.empty.html")}</p>
      </div>`;
    return;
  }
  resultsEl.innerHTML = vets.map(vetCard).join("");
}

function showNotice(html) {
  noticeEl.innerHTML = html;
}

async function load(coords) {
  skeletons();
  try {
    const vets = await API.listVets(coords?.lat, coords?.lng);
    renderVets(vets, { located: !!coords });
  } catch (err) {
    resultsEl.innerHTML = `
      <div class="state" style="grid-column:1/-1">
        <div class="emoji">⚠️</div>
        <h3>${t("home.error.title")}</h3>
        <p class="muted">${escapeHtml(err.message)}</p>
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
    const denied = err && err.code === 1; // PERMISSION_DENIED
    showNotice(`
      <div class="banner">
        <span>${denied ? t("home.banner.denied") : t("home.banner.error")}</span>
        <button class="btn btn-soft" onclick="locate()">${t("common.tryAgain")}</button>
      </div>`);
    await load(null);
  } finally {
    locateBtn.disabled = false;
    locateBtn.innerHTML = original;
  }
}

locateBtn.addEventListener("click", locate);

// Auto-attempt geolocation on first load; falls back gracefully on denial.
locate();
