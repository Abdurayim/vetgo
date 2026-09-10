/* Where the API lives. Empty = same origin (the Go server serves this frontend
   locally). On GitHub Pages the frontend is static, so point at the backend. */
const API_ORIGIN = location.hostname.endsWith("github.io")
  ? "https://178-218-200-21.sslip.io"
  : "";
