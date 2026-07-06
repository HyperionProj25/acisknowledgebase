# ACIS Knowledge Base - Product Requirements Document (v2, Phase 1 Rebuild)

> v1 of this document (March 2026) described the original proof-of-concept training site: light theme, no auth, Vercel, single-JSON content model. That site was never built to that spec and the system it documented has been retired. This v2 describes the actual, current target. The v1 POC pages themselves are preserved under `/archive`.

## 1. Purpose

An internal, PIN-protected knowledge base for Baseline Analytics covering the Arm Care Intelligence System (ACIS). It serves two jobs:

1. **Onboarding**: a new team member, advisor, or partner-facing hire can self-serve an accurate understanding of what ACIS is today.
2. **Reference**: canonical numbers, methodology, data definitions, GTM language, and partnership status live in exactly one place each and stay current.

Phase 1 (this rebuild) delivers structure and mechanics only: information architecture, content model, CI language guardrails, hardened auth, and search. Section bodies are explicit TODO(content) stubs. Phase 2 is content authoring by the team; nothing in Phase 1 invents technical content.

## 2. Tech Stack (actual)

| Component | Technology | Notes |
|-----------|-----------|-------|
| Framework | Next.js 16, App Router, `src/` layout | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4 | Tokens via `@theme` in `globals.css`, dark theme |
| Typography | GT America / GT America Mono | Self-hosted in `public/fonts/` |
| Animations | Framer Motion | Reused patterns: AnimatedCounter, WalkthroughShell |
| Content | MDX per doc in `content/` | Frontmatter: title, owner, last_reviewed, status, audience |
| Canonical facts | `src/lib/canonical.ts` | Single source for every validated number |
| Search | FlexSearch, static JSON index | Index generated at build time, no backend |
| Auth | PIN + HMAC-signed session cookie | `SITE_PIN` + `AUTH_SECRET` env vars |
| CI | GitHub Actions + Netlify build | Language lint fails the build on violations |
| Deployment | Netlify | `netlify.toml`, `@netlify/plugin-nextjs` |

## 3. Information Architecture

Nine routed sections, all navigable from the fixed top nav:

| # | Section | Route | Phase 1 state |
|---|---------|-------|---------------|
| 1 | Start Here | `/` | Stub with section map and role paths placeholder |
| 2 | Product Overview | `/product-overview` | Stub, canonical numbers wired |
| 3 | Methodology | `/methodology` | Draft (team-authored) |
| 4 | Validation | `/validation` | Stub, canonical numbers wired |
| 5 | Data Dictionary | `/data-dictionary` | Stub (feature docs are Phase 2) |
| 6 | Hitting & Biomechanics | `/hitting-biomechanics` | Stub |
| 7 | GTM Rails | `/gtm-rails` | Stub |
| 8 | Glossary | `/glossary` | Term slots with TODO definitions |
| 9 | Archive | `/archive` | Complete: the preserved March 2026 POC |

## 4. Content Model

- One MDX file per doc in `content/`, loaded by `src/lib/docs.ts` (gray-matter frontmatter parsing, next-mdx-remote rendering).
- Required frontmatter on every doc: `title`, `owner`, `last_reviewed`, `status` (`stub` | `draft` | `reviewed`), `audience`.
- Canonical numbers are never typed into docs. They live in `src/lib/canonical.ts` and render through the `<Fact k="group.key" />` MDX component. Facts are grouped so magnitudes never fuse downstream:
  - `validation`: the SP12 252-arm cohort study (the outbound headline): AUC, prior AUC, cohort design and composition, years, signal, box-score correlation, early-season stability, operating point
  - `corpus`: training/evaluation data (10.7M pitches, 311K+ appearances, MLB and MiLB coverage). The corpus is NOT the validation cohort.
  - `internal`: never outbound (model and champion names, feature counts, score scale, flag threshold, valid window, top drivers)
  - `priorStudy`: the retired 178-pitcher study, internal history only
- Every fact carries `outbound: true|false` plus an optional `outboundLabel`. Pages with `audience: outbound` render outbound labels where present, and the build fails if such a page references an internal-only fact.
- Product line everywhere: ACIS is a post-game system, not real-time.
- `<TodoContent>` marks every pending content block so stubs are visible on the page, not silent.
- The retired JSON-as-CMS file exists only as `src/lib/archive/poc-content.json` for the archived POC pages.

## 5. Language Guardrails (CI-enforced)

`scripts/lint-language.mjs` runs in the `prebuild` step (so Netlify enforces it) and in GitHub Actions. It scans `content/**` and all `src/**` outside archive paths and fails on:

1. "injury prediction" / "injury prevention" and close variants (predicts injuries, preventing injury, etc.)
2. Em dashes anywhere in copy
3. Retired POC numbers presented as current (old pitch and at-bat volumes, old reward score, old improvement and pull-rate percentages)
4. Retired POC tech presented as current (PPO, SB3, Stable Baselines, Gymnasium, Streamlit)

Archive paths are exempt: they are history behind a banner, not live claims.

## 6. Archive

Everything from the March 2026 RL proof of concept is preserved, functional, and reachable under `/archive`, behind a persistent banner on every archive page: "Archive - March 2026 RL proof of concept. Not the current system." Old deep links to the retired routes redirect into `/archive/...`. Retired interactive widgets (RewardExplorer, DataFlowPipeline, TrainingCurve, StateVectorCard, ValidationCard, BaselinesChart, GlossarySearch, walkthrough scenes) live in `src/components/archive/` and are only imported by archive pages.

## 7. Auth

- `/login` posts the PIN to `/api/auth`, which checks it against `SITE_PIN` and sets `acis-auth`: an expiring token `expiry.signature` where the signature is HMAC-SHA256 over the expiry payload with `AUTH_SECRET` (fallback: `SITE_PIN`).
- Middleware verifies signature and expiry via Web Crypto on every non-public request. A manually set cookie value does not pass.
- Cookie: httpOnly, secure, sameSite lax, 30-day expiry.
- Environment variables (set in Netlify): `SITE_PIN` (required), `AUTH_SECRET` (recommended).

## 8. Search

- `scripts/build-search-index.mjs` reads all `content/*.mdx` at build time, strips markup, and writes `public/search-index.json`.
- A client `SearchBox` (nav, plus Cmd/Ctrl+K) lazy-loads the index and queries FlexSearch. No backend, works on Netlify.

## 9. Design System (kept from the original build)

- Sunglow Gold #F5A623 on dark surfaces (#0D0D0D / #161616 / #1E1E1E), navy #1A2332
- GT America type, gold accent utilities (`gold-top-accent`, `gold-left-accent`, `gold-lines-texture`)
- Framer Motion entry animations, `prefers-reduced-motion` respected

## 10. Phase 2 (out of scope here)

Content authoring for sections 1-8: methodology prose, the 43-63 feature data dictionary, validation methodology, GTM language list, partnership status, glossary definitions, and role-based onboarding paths. Every stub carries a `<TodoContent>` marker naming what belongs there.

## 11. Success Criteria for Phase 1

1. `npm run build` passes with the language lint green
2. All nine sections route, render, and appear in nav; archive pages all work behind the banner
3. No live page or component contains a retired number, retired tech reference, or banned phrase
4. Auth cannot be bypassed by hand-setting a known cookie value
5. Search returns results from the MDX docs
6. A contributor reading CLAUDE.md gets an accurate picture of the repo
