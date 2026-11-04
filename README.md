# DIGIVIBZ

Marketing site for **DIGIVIBZ** — an AI-powered digital marketing agency. React + Vite single-page app with hash-based routing, plus a small Express/MongoDB API for the contact & audit forms and the admin inbox.

## Stack

| Layer     | Tech                                                       |
| --------- | ---------------------------------------------------------- |
| Frontend  | React 19, Vite 8, Tailwind CSS 4, motion (framer-motion), lucide-react |
| Backend   | Express 4, MongoDB Atlas (`server/index.js`)               |
| Routing   | Hash-based (`#/about`, `#/terms`, …) — no server rewrites needed |
| Hosting   | Any static host (target: **Hostinger**); optional single-port Node mode |

## Run locally

```bash
npm install
cp .env.example .env        # fill in MONGODB_URI, ADMIN_PASSWORD, ADMIN_TOKEN_SECRET
npm run dev                 # frontend on http://localhost:3000
npm run server              # API on http://localhost:5001 (proxied as /api in dev)
```

Without `.env` / the API running, the site still works — contact forms show a
friendly *"email us directly"* fallback instead of submitting.

## Scripts

| Script            | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Dev server with HMR on port 3000                    |
| `npm run build`   | Production build → `dist/` (relative asset paths)   |
| `npm run preview` | Serve the built `dist/` locally                     |
| `npm run server`  | Express API (also serves `dist/` when it exists — single-port mode) |
| `npm start`       | Same as `npm run server` (Node hosting platforms)   |
| `npm run lint`    | TypeScript type-check (`tsc --noEmit`)              |

## Deploying to Hostinger

The build uses **relative asset paths** (`base: './'`) and **hash routing**, so
it works from the domain root, a subfolder, or an add-on domain — no rewrite
rules or 404 fixes required. A `public/.htaccess` (gzip + caching + basic
headers) is included in the build output.

### Option A — Static hosting (shared hosting / Business plans)

1. Build locally: `npm run build`
2. Upload **everything inside `dist/`** into `public_html/` via Hostinger
   File Manager or FTP.
3. Done. Forms will show the email fallback until an API is connected (see
   Option C).

### Option B — Git auto-deploy

Connect the repo in **hPanel → Git** (or your pipeline), set:

- **Build command:** `npm ci && npm run build`
- **Publish directory:** `dist`

### Option C — Full-stack (API + site on one port)

For plans with Node.js support (VPS / Node cloud):

```bash
npm ci && npm run build
npm start          # serves the site AND /api on PORT (default 5001)
```

Set `VITE_API_BASE` at build time if the API lives on another origin:

```bash
VITE_API_BASE=https://api.example.com npm run build
```

### Environment variables (server only)

See `.env.example` — `MONGODB_URI`, `ADMIN_PASSWORD`, `ADMIN_TOKEN_SECRET`,
`PORT`. The frontend never receives these; **never commit `.env`** (already in
`.gitignore`).

## Project structure

```
src/
  pages/        # Route pages: Home (App), About, Portfolio, Services, Contact,
                # CaseStudy, Admin + legal pages (Refund, Privacy, Terms,
                # Marketing Disclaimer, Legal Notice)
  components/   # Navbar, Footer, Hero, forms, sections…
  data/         # All page copy incl. verbatim legal content
  lib/api.ts    # Typed API client with graceful-failure handling
server/         # Express API: contact form, admin inbox (JWT), MongoDB
public/         # Static assets, favicon, robots.txt, .htaccess
```

## Legal pages

`#/refund-policy` · `#/privacy-policy` · `#/terms` ·
`#/marketing-disclaimer` · `#/legal-notice`

Content in `src/data/*Content.ts` mirrors client-provided text verbatim —
edit copy there, not in the page components.
