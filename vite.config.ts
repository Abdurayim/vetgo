import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// VITE_BASE is injected by the GitHub Pages deploy workflow so that the
// built assets resolve correctly when hosted at a sub-path like /vet/.
// Leave it unset for local dev (defaults to "/").
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
