## Repo overview

- Stack: React + TypeScript (Vite) front-end, small Express Node backend for server-side APIs and email, plus a PHP `admin/` area for site administration. See `package.json` scripts and `server/server.js`.
- Purpose: public-facing site for EMANATE with program pages, news, and a server-side GenAI proxy endpoint.

## Important files & where to look

- `package.json` — scripts and dependencies (dev: `vite`, server: `server/server.js`, combined: `npm run dev:all`).
- `vite.config.ts` — Vite config and env injection (aliases, process.env.GEMINI_API_KEY define). Note the repo uses an alias `@` → project root.
- `server/server.js` — Express API: `/api/join` (email sending) and `/api/genai` (proxy to Google GenAI). Server handles CORS, file uploads under `/uploads`, and nodemailer/Ethereal fallback.
- `src/i18n.ts` and `src/locales/*` — localization. Language is stored under localStorage key `emanate_lang` and `document.documentElement.lang` is set.
- `netlify/functions/genai.js` — kept for reference; actual GenAI routes are handled by `server/server.js`.
- `pages/` and `components/` — UI components and page layout conventions. `admin/` contains a separate PHP admin panel and SQL schema; treat this as a separate backend area.

## How to run & debug locally (explicit)

1. Install deps: `npm install`.
2. Dev frontend: `npm run dev` (Vite). Note: `package.json` runs Vite on port 5173; `vite.config.ts` sets a server port 3000 — use the `dev` script unless you intentionally change ports. If you need both frontend and backend in dev, use `npm run dev:all` which runs the Vite dev server and the Express server concurrently.
3. Start backend server (standalone): `npm run server` — this runs `node server/server.js`.
4. Environment: server requires `GEMINI_API_KEY` (for GenAI proxy) and optional `SMTP_*` vars for real email. If SMTP is not provided, the server uses Ethereal for local email previews (check console for preview URL).

Common debugging points

- Missing GenAI package: server checks for `@google/generai` and returns 501 if not installed — don't assume it exists in all environments.
- CORS: `server/server.js` limits origins by env; update allowed origins there when changing the dev port or deploying to a new host.
- Email: without SMTP credentials you get Ethereal preview links printed to the server console.

## Project conventions the agent should follow

- Secrets: do not commit API keys or SMTP credentials. Keys are read from `.env` via `dotenv` in `server/server.js` and injected to client via `vite.config.ts` defines. Prefer server-side usage of secret keys (GenAI key should stay server-side).
- API surface: frontend interacts with server endpoints under `/api/*` (not PHP admin routes). Examples: `/api/join` and `/api/genai` in `server/server.js`.
- i18n: use the `i18n` resource files under `src/locales/` and respect the `emanate_lang` localStorage key for language defaults.
- UI structure: pages live in `pages/` and UI pieces in `components/`. Components follow simple prop-driven patterns (look at `PostCard.tsx` and `JoinForm.tsx` for examples).
- Admin: `admin/` is a legacy PHP admin console that expects a LAMP-style environment and SQL in `admin/schema.sql` and `schema/contact_submissions.sql`. Avoid changing admin files unless you understand that this is a separate backend.

## Integration & dependency notes for changes

- Google GenAI: server proxies calls and requires `GEMINI_API_KEY`. The client should not contain the API key. See `server/server.js` for the proxy flow and error handling.
- Netlify functions: `netlify/functions/genai.js` is intentionally stubbed; ignore for runtime behavior unless you plan to re-enable Netlify functions.
- Node vs PHP backends: the repo has both a Node/Express backend and a PHP admin site. They are not automatically integrated — any cross-communication requires deliberate wiring (e.g., shared DB or API endpoints).

## Example tasks & quick hints for the agent

- Add a new API endpoint: update `server/server.js` and add client calls under `src/*` or `pages/*`. Keep CORS and env requirements consistent.
- Add a locale: put JSON in `src/locales/`, update `src/i18n.ts` resources, and ensure pages consume translations via `react-i18next`.
- Debug GenAI: start `npm run server`, verify `GEMINI_API_KEY` is set, then POST to `/api/genai` with `{ prompt }`. If the package `@google/generai` is missing, the endpoint returns 501.

## Where to look for further context

- `README.md` — quick start and mention of GEMINI_API_KEY.
- `package.json` — scripts and dependency list.
- `server/server.js`, `vite.config.ts`, `src/i18n.ts` — canonical implementation patterns to follow.

If anything here looks incorrect or you want more detail (examples of component props, key pages to prioritize, or preferred test patterns), tell me which area to expand and I'll update this file.
