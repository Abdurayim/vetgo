# VetGo

A location-based veterinarian directory. **Pet owners browse without registering** —
they allow location access and see vets sorted by distance, each with photo, name,
profession, description, and contact actions (call / WhatsApp / copy number).
**Vets register** and manage their public profile from a dashboard.

This repository holds the **frontend** only: plain HTML/CSS/JS with no build step,
deployed to GitHub Pages. The API is a separate Go (Gin) + SQLite service.

## Configuration

`js/config.js` sets where the API lives:

- On `*.github.io` it points to the deployed backend (`https://178-218-200-21.sslip.io`).
- Anywhere else it is empty, meaning same origin (the Go server serves these files locally).

The backend must list this site's origin (`https://abdurayim.github.io`) in its
`CORS_ORIGINS` setting.

## Languages

English, Russian and Uzbek. The default follows the device language and can be
changed in the header (saved in `localStorage`). All strings live in `js/i18n.js`.

## Deploy

Every push to `main` publishes the repository root to GitHub Pages via
`.github/workflows/pages.yml`.
