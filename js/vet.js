/* Vet detail page: full post + contact actions (call / WhatsApp / copy). */

document.getElementById("header").innerHTML = renderHeader();
document.getElementById("footer").innerHTML = renderFooter();
I18N.apply();

const detailEl = document.getElementById("detail");
const id = new URLSearchParams(location.search).get("id");

// Strip everything but digits and a leading + for tel:/wa.me links.
function normalizePhone(phone) {
  const cleaned = String(phone).replace(/[^\d+]/g, "");
  return cleaned.startsWith("+") ? "+" + cleaned.slice(1).replace(/\+/g, "") : cleaned;
}

function render(v) {
  const photo = photoUrl(v.photo_path);
  const dist = formatDistance(v.distance_km);
  const tel = normalizePhone(v.phone);
  const wa = tel.replace(/[^\d]/g, ""); // wa.me wants digits only, no +

  detailEl.innerHTML = `
    <div class="detail">
      <div class="detail-photo">
        ${
          photo
            ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(v.full_name)}" />`
            : `<div class="placeholder">🐾</div>`
        }
      </div>
      <div>
        <span class="profession">${escapeHtml(v.profession)}</span>
        <h1>${escapeHtml(v.full_name)}</h1>
        <div class="meta-row">
          ${dist ? `<span>📍 ${dist}</span>` : ""}
        </div>

        ${
          v.description
            ? `<div class="about">
                 <h3>${t("vet.about")}</h3>
                 <p>${escapeHtml(v.description)}</p>
               </div>`
            : ""
        }

        <div class="contact-card">
          <div class="phone" id="phone">${escapeHtml(v.phone)}</div>
          <div class="contact-actions">
            <a class="btn btn-primary" href="tel:${escapeHtml(tel)}">${t("vet.call")}</a>
            <a class="btn btn-whatsapp" href="https://wa.me/${escapeHtml(wa)}" target="_blank" rel="noopener">${t("vet.whatsapp")}</a>
            <button class="btn btn-ghost" id="copyBtn">${t("vet.copy")}</button>
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById("copyBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(v.phone);
      toast(t("vet.copied"));
    } catch {
      toast(t("vet.copyFail", { phone: v.phone }));
    }
  });

  document.title = `${v.full_name} — ${BRAND}`;
}

function renderError(message) {
  detailEl.innerHTML = `
    <div class="state">
      <div class="emoji">🔍</div>
      <h3>${t("vet.notFound.title")}</h3>
      <p class="muted">${escapeHtml(message)}</p>
      <p><a class="btn btn-primary" href="index.html">${t("vet.notFound.back")}</a></p>
    </div>`;
}

async function init() {
  if (!id) {
    renderError(t("vet.notSpecified"));
    return;
  }
  detailEl.innerHTML = `<div class="state"><span class="spinner" style="border-color:#ccc;border-top-color:var(--accent)"></span></div>`;
  try {
    const vet = await API.getVet(id);
    render(vet);
  } catch (err) {
    renderError(err.message);
  }
}

init();
