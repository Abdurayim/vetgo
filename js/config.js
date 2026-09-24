/* Where the API lives. Empty = same origin (the Go server serves this frontend
   locally). Anywhere else — GitHub Pages or vetgo.uz — the frontend is static,
   so it calls the API on its own host. */
const API_ORIGIN =
  location.protocol === "file:" || ["localhost", "127.0.0.1"].includes(location.hostname)
    ? ""
    : "https://vetapi.skintrader.uz";
