/* Shared markup for every page: icons, header, footer, vet card and vet
   profile. Pure functions returning HTML strings (user content escaped).
   Load after i18n.js and api.js. */

const ICONS = {
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  locate: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  map: '<path d="M9 4 3 6.5V20l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  phone: '<path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a2 2 0 0 1-2.2 2A17 17 0 0 1 3 6.2 2 2 0 0 1 5 4z"/>',
  whatsapp: '<path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.5L3.5 20.5l1.4-4.1a8.6 8.6 0 1 1 15.6-4.8z"/><path d="M9.2 8.6c.3 2.9 3.2 5.8 6.2 6.2l1.1-1.6-2.1-1.1-.9.8c-1-.4-1.9-1.3-2.3-2.3l.8-.9-1.1-2.1z" fill="currentColor" stroke="none"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V13M12 16.5v.01"/>',
  paw: '<g fill="currentColor" stroke="none"><ellipse cx="5.5" cy="10" rx="2.2" ry="2.8"/><ellipse cx="9.5" cy="5.2" rx="2.2" ry="2.8"/><ellipse cx="14.5" cy="5.2" rx="2.2" ry="2.8"/><ellipse cx="18.5" cy="10" rx="2.2" ry="2.8"/><path d="M12 11c-3 0-6.5 4.2-6.5 6.8 0 1.8 1.4 2.7 3 2.7 1.4 0 2.3-.8 3.5-.8s2.1.8 3.5.8c1.6 0 3-.9 3-2.7C18.5 15.2 15 11 12 11z"/></g>',
};

function icon(name, size = 20) {
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;
}

/* Replace <span data-icon="name" data-size="18"></span> placeholders with SVG icons. */
function applyIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    el.outerHTML = icon(el.dataset.icon, Number(el.dataset.size) || 20);
  });
}

/* ---------- Page chrome ---------- */

function renderHeader() {
  const account = Auth.isLoggedIn
    ? `<a class="btn btn-outline" href="dashboard.html">${icon("user", 18)}<span>${t("nav.myProfile")}</span></a>`
    : `<a class="btn btn-ghost" href="login.html">${t("nav.login")}</a>
       <a class="btn btn-primary" href="register.html">${t("nav.join")}</a>`;
  return `
    <header class="site-header">
      <div class="container">
        <a class="brand" href="index.html">
          <span class="brand-mark">${icon("paw", 24)}</span>
          <span class="brand-name">${BRAND}</span>
        </a>
        <nav class="header-actions">
          ${I18N.renderSwitcher()}
          ${account}
        </nav>
      </div>
    </header>`;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <span>${t("footer.tagline")}</span>
        <span class="footer-langs">EN · RU · UZ</span>
      </div>
    </footer>`;
}

/* Render header and footer, translate static text and draw icons. Every page calls this first. */
function initPage() {
  document.getElementById("header").innerHTML = renderHeader();
  document.getElementById("footer").innerHTML = renderFooter();
  I18N.apply();
  applyIcons();
}

/* ---------- Vets ---------- */

/* Up to two initials from the last two words, skipping titles like "Dr.". */
function initials(name) {
  const words = String(name || "").trim().split(/\s+/).filter((w) => w && !w.endsWith("."));
  return (words.slice(-2).map((w) => w[0]).join("") || "?").toUpperCase();
}

/* Strip everything but digits and a leading + for tel:/wa.me links. */
function normalizePhone(phone) {
  const cleaned = String(phone).replace(/[^\d+]/g, "");
  return cleaned.startsWith("+") ? "+" + cleaned.slice(1).replace(/\+/g, "") : cleaned;
}

function vetPhoto(v) {
  const photo = photoUrl(v.photo_path);
  return photo
    ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(v.full_name)}" loading="lazy" />`
    : `<span class="initials" aria-hidden="true">${escapeHtml(initials(v.full_name))}</span>`;
}

/* Directory card. With { link: false } it renders as a static preview. */
function vetCard(v, { link = true } = {}) {
  const dist = formatDistance(v.distance_km, { short: true });
  const open = link ? `<a class="card" href="vet.html?id=${encodeURIComponent(v.id)}">` : `<div class="card">`;
  return `
    ${open}
      <div class="card-photo">
        ${vetPhoto(v)}
        ${dist ? `<span class="distance-badge">${icon("pin", 16)}${escapeHtml(dist)}</span>` : ""}
      </div>
      <div class="card-body">
        <span class="profession">${escapeHtml(v.profession)}</span>
        <h3>${escapeHtml(v.full_name)}</h3>
        ${v.description ? `<p class="card-desc">${escapeHtml(v.description)}</p>` : ""}
      </div>
      ${link ? `<div class="card-foot"><span>${t("card.viewProfile")}</span><span class="card-go">${icon("arrowRight", 18)}</span></div>` : ""}
    ${link ? "</a>" : "</div>"}`;
}

/* Full public profile with contact actions (the copy button is wired by vet.js). */
function vetDetail(v) {
  const dist = formatDistance(v.distance_km);
  const tel = normalizePhone(v.phone);
  const wa = tel.replace(/[^\d]/g, ""); // wa.me wants digits only, no +
  return `
    <div class="detail">
      <div class="detail-photo">${vetPhoto(v)}</div>
      <div class="detail-main">
        <span class="profession">${escapeHtml(v.profession)}</span>
        <h1>${escapeHtml(v.full_name)}</h1>
        ${dist ? `<p class="detail-meta">${icon("pin", 18)}${escapeHtml(dist)}</p>` : ""}
        ${
          v.description
            ? `<section class="about">
                 <h2>${t("vet.about")}</h2>
                 <p>${escapeHtml(v.description)}</p>
               </section>`
            : ""
        }
        <section class="contact-card">
          <span class="contact-label">${t("vet.contact")}</span>
          <div class="phone">${escapeHtml(v.phone)}</div>
          <div class="contact-actions">
            <a class="btn btn-accent btn-lg" href="tel:${escapeHtml(tel)}">${icon("phone")}<span>${t("vet.call")}</span></a>
            <a class="btn btn-whatsapp btn-lg" href="https://wa.me/${escapeHtml(wa)}" target="_blank" rel="noopener">${icon("whatsapp")}<span>${t("vet.whatsapp")}</span></a>
            <button class="btn btn-light btn-lg" type="button" id="copyBtn">${icon("copy")}<span>${t("vet.copy")}</span></button>
          </div>
        </section>
      </div>
    </div>`;
}
