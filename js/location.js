/* Location field shared by registration and the dashboard. Vets can detect their
   position through the browser or pick it on a map (Leaflet + OpenStreetMap).
   The map is the fallback when a browser can't or won't share location, and lets
   a vet pin their clinic rather than wherever they happen to be right now. */

const MAP_DEFAULT_CENTER = [41.3111, 69.2797]; // Tashkent
const MAP_DEFAULT_ZOOM = 12;
const MAP_PIN_ZOOM = 16;

/* Wires up #locBtn, #mapBtn, #mapWrap/#map, #locStatus and the hidden
   #latitude/#longitude inputs. successKey is the i18n key shown once set. */
function initLocationField({ successKey }) {
  const latEl = document.getElementById("latitude");
  const lngEl = document.getElementById("longitude");
  const statusEl = document.getElementById("locStatus");
  const detectBtn = document.getElementById("locBtn");
  const mapBtn = document.getElementById("mapBtn");
  const mapWrap = document.getElementById("mapWrap");

  let map = null;
  let marker = null;

  function setStatus(text, ok = false) {
    statusEl.textContent = text;
    statusEl.className = ok ? "location-status ok" : "location-status";
  }

  function currentCoords() {
    if (!latEl.value || !lngEl.value) return null;
    return [Number(latEl.value), Number(lngEl.value)];
  }

  function setCoords(lat, lng) {
    latEl.value = lat.toFixed(6);
    lngEl.value = lng.toFixed(6);
    setStatus(t(successKey, { lat: lat.toFixed(4), lng: lng.toFixed(4) }), true);
  }

  // Move the pin and view to the form's coordinates, if the map has been opened.
  // No animation: a zoom animation can stall when the tab isn't painting,
  // leaving the view off-centre.
  function syncMap() {
    const coords = currentCoords();
    if (!map || !coords) return;
    marker.setLatLng(coords).addTo(map);
    map.setView(coords, Math.max(map.getZoom(), MAP_PIN_ZOOM), { animate: false });
  }

  function pick(latlng) {
    const p = latlng.wrap(); // a click on a repeated world copy can exceed ±180°
    setCoords(p.lat, p.lng);
    marker.setLatLng(p).addTo(map);
  }

  function openMap() {
    mapWrap.classList.remove("hidden");
    if (!window.L) {
      setStatus(t("loc.mapUnavailable"));
      return;
    }
    if (!map) {
      const coords = currentCoords();
      map = L.map("map").setView(coords || MAP_DEFAULT_CENTER, coords ? MAP_PIN_ZOOM : MAP_DEFAULT_ZOOM);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      marker = L.marker(MAP_DEFAULT_CENTER, {
        draggable: true,
        icon: L.divIcon({ className: "map-pin", html: "<span></span>", iconSize: [28, 28], iconAnchor: [14, 34] }),
      });
      map.on("click", (e) => pick(e.latlng));
      marker.on("dragend", () => pick(marker.getLatLng()));
    }
    // Leaflet measures its container when created; make sure it sees the real size.
    map.invalidateSize();
    syncMap();
    mapWrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  detectBtn.addEventListener("click", async () => {
    detectBtn.disabled = true;
    setStatus(t("common.locating"));
    try {
      const { lat, lng } = await getLocation();
      setCoords(lat, lng);
      syncMap();
    } catch (err) {
      setStatus(locationErrorMessage(err));
      openMap(); // let them place it by hand instead
    } finally {
      detectBtn.disabled = false;
    }
  });

  mapBtn.addEventListener("click", openMap);

  return { syncMap };
}
