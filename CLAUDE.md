# ACIS Knowledge Base - Internal Training and Reference Portal

## Project Overview
This is the internal knowledge base for Baseline Analytics' Arm Care Intelligence System (ACIS). It is the onboarding and reference resource for the team and leadership (Chase Spivey - Founder & CEO, Sheldon McClelland - Founder & COO, Jeff Newman - Executive Chairman).

The knowledge base is in a Phase 1 rebuild state: the information architecture, content model, CI guardrails, auth, and search are in place, but most section bodies are TODO(content) stubs awaiting Phase 2 content authoring. Do not invent technical content to fill a stub. If a fact is not in `src/lib/canonical.ts` or supplied by the team, leave the stub in place.

## Tech Stack (actual, verified)
- **Framework:** Next.js 16 (App Router, `src/` directory layout)
- **Styling:** Tailwind CSS v4 (tokens defined via `@theme` in `src/app/globals.css`), dark theme
- **Typography:** GT America and GT America Mono, self-hosted in `public/fonts/`
- **Animations:** Framer Motion
- **Content:** Per-document MDX files in `content/` rendered with next-mdx-remote
- **Search:** FlexSearch client-side over a static index generated at build time
- **Auth:** PIN login that sets an HMAC-signed session cookie (see Auth below)
- **Deployment:** Netlify (`netlify.toml`, `@netlify/plugin-nextjs`). Not Vercel.

## Content Model
- Every live doc is one MDX file in `content/` with required frontmatter: `title`, `owner`, `last_reviewed`, `status`, `audience`.
- `src/lib/docs.ts` loads and parses the MDX files. `src/app/[slug]/page.tsx` routes them; `content/start-here.mdx` renders at `/`.
- **Canonical numbers live in `src/lib/canonical.ts` and only there.** Docs reference them with the `<Fact k="..." />` MDX component. Never type a validated metric (AUC, cohort size, catch rate, data volumes) directly into a doc or component; update it once in canonical.ts and it propagates.
- Do not hardcode content strings in components. Components render what docs and canonical.ts provide.
- The old `docs/content.json` JSON-as-CMS model is retired. It survives only as `src/lib/archive/poc-content.json`, feeding the archived proof-of-concept pages. Do not add new content to it.

## Language Rules (enforced by CI)
`scripts/lint-language.mjs` runs before every build (locally, in GitHub Actions, and on Netlify) and fails the build on violations in `content/` and non-archive `src/` code:
- Never the phrases "injury prediction" or "injury prevention", or close variants such as "predicts injuries" or "preventing injury". ACIS is described in workload and arm care terms, never as predicting or preventing injuries.
- Never use em dashes in any copy.
- Never present retired proof-of-concept numbers or tech as current: the old pitch/at-bat volumes, the old reward and pull-rate metrics, and PPO / SB3 / Gymnasium / Streamlit as current technology. The archive keeps them as history; live pages must not.
- Archive paths (`src/app/archive/`, `src/components/archive/`, `src/lib/archive/`) are exempt because they are a preserved historical record behind a banner.

Run `npm run lint:language` before committing content changes.

## Sections (information architecture)
1. Start Here (`/`) - orientation and role-based reading paths
2. Product Overview (`/product-overview`)
3. Model Methodology (`/model-methodology`)
4. Validation (`/validation`)
5. Data Dictionary (`/data-dictionary`)
6. Hitting & Biomechanics (`/hitting-biomechanics`)
7. GTM Rails (`/gtm-rails`)
8. Glossary (`/glossary`)
9. Archive (`/archive`) - the March 2026 RL proof of concept, preserved read-only behind a persistent banner

## Archive Policy
The `/archive` section preserves the retired reinforcement-learning proof of concept (pipeline explorer, state vector, reward explorer, training curve, POC validation, POC walkthrough, POC glossary and limitations). It exists as history, is clearly bannered as not the current system, and should not be extended or updated except to fix breakage. Reusable interaction patterns (AnimatedCounter, WalkthroughShell, ProgressBar, SceneNavigation, SceneRenderer) stay in live `src/components/` as templates for future content.

## Auth
- `/api/auth` verifies the PIN from the `SITE_PIN` environment variable and sets an HMAC-SHA256 signed, expiring session cookie (`acis-auth`).
- `src/middleware.ts` verifies the signature and expiry with Web Crypto on every request (edge-safe; do not add `runtime = "nodejs"` directives, they crash Netlify edge functions).
- Signing secret: `AUTH_SECRET` env var, falling back to `SITE_PIN` if unset. Set both in Netlify.
- Token helpers live in `src/lib/auth-token.ts`.

## Brand Identity
- Primary brand color (Sunglow Gold): #F5A623
- Dark surfaces: #0D0D0D base, #161616 card, #1E1E1E elevated
- Navy: #1A2332, success green: #38A169, warning yellow: #ECC94B, danger red: #E53E3E
- Dark theme throughout. Typography is GT America (sans) and GT America Mono (code/data).
- Design tone: premium, data-forward, sports-tech. Not playful, not corporate-stuffy.

## Commands
- `npm run dev` - local development (builds the search index first)
- `npm run build` - language lint, search index, then production build
- `npm run lint` - ESLint
- `npm run lint:language` - the CI language lint on its own
- Deploy: push to the connected branch; Netlify builds with `npm run build`

## Important Notes
- ACIS = Arm Care Intelligence System. Use the full name on first mention per page, then "ACIS".
- Chase Spivey = "Founder & CEO", Sheldon McClelland = "Founder & COO" (never other titles)
- This is a Wyoming C-Corporation
- Never use em dashes in any copy
- Content stubs are marked with the `<TodoContent>` component. Filling them requires facts from the team, not inference.
