/* Location field shared by registration and the dashboard. On registration the
   position is looked up as soon as the page opens and shown on a map (Leaflet +
   OpenStreetMap) with the pin already placed; vets only drag it if their clinic
   is somewhere else. When the browser can't provide a position, the approximate
   location of the visitor's IP address is used instead, and tapping the map
   always works. */

const MAP_DEFAULT_CENTER = [41.3111, 69.2797]; // Tashkent
const MAP_DEFAULT_ZOOM = 12;
const MAP_APPROX_ZOOM = 13;
const MAP_PIN_ZOOM = 16;
const ROUGH_ACCURACY_M = 1000; // coarser than this, ask the vet to check the pin

/* Wires up #locBtn, #mapBtn, #mapWrap/#map, #locStatus, the hidden
   #latitude/#longitude inputs and, if present, the #geoCredit attribution.
   - successKey: i18n key shown after picking a spot by hand
   - autoDetect: look the position up right away, with the map already open
   - approximateFallback: use the IP-based location when the browser can't */
function initLocationField({ successKey, autoDetect = false, approximateFallback = false }) {
  const latEl = document.getElementById("latitude");
  const lngEl = document.getElementById("longitude");
  const statusEl = document.getElementById("locStatus");
  const detectBtn = document.getElementById("locBtn");
  const mapBtn = document.getElementById("mapBtn");
  const mapWrap = document.getElementById("mapWrap");
  const creditEl = document.getElementById("geoCredit");

  let map = null;
  let marker = null;
  let accuracyRing = null;
  let pickedByHand = false; // a manual pick wins over later GPS refinements

  function setStatus(text, tone = "") {
    statusEl.textContent = text;
    statusEl.className = tone ? `location-status ${tone}` : "location-status";
  }

  function showCredit(show) {
    if (creditEl) creditEl.classList.toggle("hidden", !show);
  }

  function currentCoords() {
    if (!latEl.value || !lngEl.value) return null;
    return [Number(latEl.value), Number(lngEl.value)];
  }

  function setCoords(lat, lng) {
    latEl.value = lat.toFixed(6);
    lngEl.value = lng.toFixed(6);
  }

  // Create the map on first use; false when Leaflet didn't load.
  function ensureMap() {
    mapWrap.classList.remove("hidden");
    if (!window.L) {
      setStatus(t("loc.mapUnavailable"), "warn");
      return false;
    }
    if (!map) {
      const coords = currentCoords();
      map = L.map("map").setView(coords || MAP_DEFAULT_CENTER, coords ? MAP_PIN_ZOOM : MAP_DEFAULT_ZOOM);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      marker = L.marker(coords || MAP_DEFAULT_CENTER, {
        draggable: true,
        icon: L.divIcon({ className: "map-pin", html: "<span></span>", iconSize: [28, 28], iconAnchor: [14, 34] }),
      });
      if (coords) marker.addTo(map);
      map.on("click", (e) => pick(e.latlng));
      marker.on("dragend", () => pick(marker.getLatLng()));
    }
    // Leaflet measures its container when created; make sure it sees the real size.
    map.invalidateSize();
    return true;
  }

  // Place the pin, draw the accuracy ring and frame the spot. No animation:
  // a zoom animation can stall when the tab isn't painting.
  function placePin(lat, lng, { zoom, accuracy } = {}) {
    if (!ensureMap()) return;
    marker.setLatLng([lat, lng]).addTo(map);
    if (accuracyRing) accuracyRing.remove();
    accuracyRing = accuracy
      ? L.circle([lat, lng], { radius: accuracy, color: "#D41F74", weight: 1.5, fillColor: "#D41F74", fillOpacity: 0.12, interactive: false }).addTo(map)
      : null;
    map.setView([lat, lng], zoom ?? Math.max(map.getZoom(), MAP_PIN_ZOOM), { animate: false });
  }

  // Move the pin and view to the form's coordinates, if the map has been opened.
  function syncMap() {
    const coords = currentCoords();
    if (map && coords) placePin(coords[0], coords[1]);
  }

  function pick(latlng) {
    const p = latlng.wrap(); // a click on a repeated world copy can exceed ±180°
    pickedByHand = true;
    setCoords(p.lat, p.lng);
    marker.setLatLng(p).addTo(map);
    if (accuracyRing) {
      accuracyRing.remove();
      accuracyRing = null;
    }
    setStatus(t(successKey, { lat: p.lat.toFixed(4), lng: p.lng.toFixed(4) }), "ok");
    showCredit(false);
  }

  function useFix(fix) {
    if (pickedByHand) return;
    const rough = fix.accuracy > ROUGH_ACCURACY_M;
    setCoords(fix.lat, fix.lng);
    placePin(fix.lat, fix.lng, { zoom: rough ? MAP_APPROX_ZOOM : MAP_PIN_ZOOM, accuracy: fix.accuracy });
    setStatus(t(rough ? "loc.foundRough" : "loc.found", { acc: formatAccuracy(fix.accuracy) }), rough ? "warn" : "ok");
    showCredit(false);
  }

  // The browser couldn't locate: try the IP-based estimate, else explain why.
  async function fallBack(err) {
    const tip = IN_APP_BROWSER ? " " + t("loc.inApp") : "";
    const approx = approximateFallback ? await approximateLocation() : null;
    if (pickedByHand) return;
    if (approx) {
      setCoords(approx.latitude, approx.longitude);
      placePin(approx.latitude, approx.longitude, { zoom: MAP_APPROX_ZOOM });
      setStatus((approx.city ? t("loc.approx", { city: approx.city }) : t("loc.approxNoCity")) + tip, "warn");
      showCredit(true);
      return;
    }
    setStatus(locationErrorMessage(err) + tip, "warn");
    ensureMap(); // let them place it by hand instead
  }

  async function detect() {
    detectBtn.disabled = true;
    pickedByHand = false;
    setStatus(t("loc.finding"));
    try {
      useFix(await getLocation({ onRefine: useFix }));
    } catch (err) {
      await fallBack(err);
    } finally {
      detectBtn.disabled = false;
    }
  }

  detectBtn.addEventListener("click", detect);
  mapBtn.addEventListener("click", () => {
    if (!ensureMap()) return;
    syncMap();
    mapWrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  if (autoDetect) {
    mapBtn.classList.add("hidden"); // the map is already on screen
    ensureMap();
    detect();
  }

  return { syncMap };
}
