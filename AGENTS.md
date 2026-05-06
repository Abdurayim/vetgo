# VetGo — Vite + React + React Router v7

This is a **Vite + React SPA** (not Next.js). Key conventions:

- **Router**: React Router v7 (`createBrowserRouter`). All routes live in `src/router.tsx`. Page components live in `src/pages/`.
- **Data fetching**: TanStack Query v5. Query functions call `src/features/*/api/*.ts` modules that return mock data now and will call the SQLite backend later.
- **Auth**: JWT token in `localStorage` (`vetgo_auth_token`). `AuthProvider` hydrates on mount via `getCurrentUser()`. `RequireAuth` / `RequireRole` wrap protected routes.
- **API client**: `src/shared/lib/api-client.ts` — fetch wrapper that injects `Authorization: Bearer` and proxies `/api/*` to `localhost:3001` in dev.
- **Styling**: Tailwind v4 with PostCSS. No Next.js directives. Globals in `src/styles/globals.css`.
- **UI components**: `@base-ui/react` + shadcn-style components in `src/components/ui/`.
- **State**: Zustand for auth (`src/shared/stores/authStore.ts`).
- **No SSR, no server actions, no `"use client"` / `"use server"` directives.**

## Dev

```bash
npm run dev      # Vite on :5173
npm run build    # tsc + vite build
npm run preview  # serve dist/
npm run lint     # eslint
```

## Mock login roles

The mock `authApi` picks a role from the email prefix:
- `admin@...` → admin
- `vet@...` → vet
- `seller@...` → seller
- anything else → pet_owner
