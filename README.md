# VetGo

A pet owner ↔ vet booking and marketplace platform.

**Stack:** Vite · React 19 · React Router v7 · TanStack Query · Zustand · Tailwind v4 · TypeScript

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server on :5173 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint |

## Project structure

```
src/
  main.tsx          # Entry point
  App.tsx           # Provider tree + RouterProvider
  router.tsx        # React Router v7 route tree
  pages/            # One file per route
  features/         # Feature-sliced: api/, components/, hooks/, types/
  shared/           # Reusable lib, providers, components, stores
  styles/           # globals.css (Tailwind v4)
```

## Environment

Create a `.env.local` for the future backend:

```
VITE_API_BASE_URL=http://localhost:3001/api
```

Without it, the dev proxy forwards `/api/*` to `localhost:3001` automatically.

## Mock auth

The mock login assigns roles by email prefix:
- `admin@...` → admin dashboard
- `vet@...` → vet dashboard
- `seller@...` → seller dashboard
- anything else → pet owner dashboard
