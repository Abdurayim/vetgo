/* Vet profile page: full profile + contact actions (call / WhatsApp / copy). */

initPage();

const detailEl = document.getElementById("detail");
const id = new URLSearchParams(location.search).get("id");

function render(v) {
  detailEl.innerHTML = vetDetail(v);

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
      <div class="state-icon">${icon("alert", 34)}</div>
      <h3>${t("vet.notFound.title")}</h3>
      <p>${escapeHtml(message)}</p>
      <a class="btn btn-primary" href="index.html">${t("vet.notFound.back")}</a>
    </div>`;
}

async function init() {
  if (!id) {
    renderError(t("vet.notSpecified"));
    return;
  }
  detailEl.innerHTML = `<div class="loading-state"><span class="spinner spinner-lg"></span></div>`;
  try {
    const vet = await API.getVet(id);
    render(vet);
  } catch (err) {
    renderError(err.message);
  }
}

init();
