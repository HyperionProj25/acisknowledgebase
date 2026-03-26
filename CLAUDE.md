# ACIS Knowledge Base - Interactive Training Portal

## Project Overview
This is an interactive internal knowledge base for Baseline Analytics' Arm Care Intelligence System (ACIS). It serves as a training and onboarding tool for company leadership (Chase Spivey - Founder & CEO, Sheldon McClelland - Founder & COO, Jeff Newman - Executive Chairman).

The site makes ACIS's technical foundation tangible through interactive elements: animated data flow diagrams, a reward function explorer with live sliders, clickable state vector cards, searchable glossary, and validation dashboards.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Deployment:** Vercel
- **No backend required** - all content is static/client-side

## Brand Identity
- **Primary brand color (Sunglow Gold):** #F5A623
- **Dark navy:** #1A2332
- **Medium gray (body text):** #4A5568
- **Light background:** #F7FAFC
- **White:** #FFFFFF
- **Success green:** #38A169
- **Warning yellow:** #ECC94B
- **Danger red:** #E53E3E
- Refer to `Baseline _ Source Files/` in the project root for any brand assets (logos, fonts, etc.) that Chase has added. Use these as the primary reference for visual identity.
- Typography: clean sans-serif (Inter or system font stack)
- Design tone: premium, data-forward, sports-tech. Not playful, not corporate-stuffy. Think Bloomberg Terminal meets ESPN.

## Content Source
All ACIS content is in `docs/content.json`. This is the single source of truth for all text, definitions, data values, and structured content displayed in the app. Do not hardcode content strings in components -- pull from this file or a constants file derived from it.

## Architecture Principles
- App Router (`/app` directory)
- Single-page feel with smooth scroll navigation between sections, but use Next.js routes for each major section so URLs are shareable
- All interactive widgets are client components (`"use client"`)
- No authentication required (internal tool, shared via URL)
- Mobile-responsive but optimized for desktop (primary use case is laptop/desktop review)
- Animations should be tasteful and purposeful, not decorative. Every animation should help the user understand something.

## Key Interactive Elements
1. **Data Flow Pipeline** - Animated, clickable node graph showing Statcast → preprocessing → features → environment → training → model → app
2. **State Vector Explorer** - 6 interactive cards, one per feature, with expand/collapse detail
3. **Reward Function Explorer** - 5 sliders controlling reward weights with a live personality gauge and outcome simulation
4. **Training Curve Visualization** - Animated Recharts line chart showing reward improvement over 500K timesteps
5. **Validation Dashboard** - 3 animated metric cards with progress indicators
6. **Glossary** - Searchable, filterable, 24 terms

## File Structure Convention
```
app/
  layout.tsx          # Root layout with nav, brand header
  page.tsx            # Home/hero + overview
  how-it-works/
    page.tsx          # Data flow pipeline interactive
  state-vector/
    page.tsx          # 6-feature explorer
  reward-function/
    page.tsx          # Slider explorer
  validation/
    page.tsx          # Results dashboard + training curve
  glossary/
    page.tsx          # Searchable glossary
  limitations/
    page.tsx          # Known limitations + roadmap
components/
  Navigation.tsx
  DataFlowPipeline.tsx
  StateVectorCard.tsx
  RewardExplorer.tsx
  TrainingCurve.tsx
  ValidationCard.tsx
  GlossarySearch.tsx
  ...
lib/
  content.ts          # Typed content loader from content.json
  constants.ts        # Brand colors, config values
```

## Commands
- `npm run dev` - local development
- `npm run build` - production build
- `npm run lint` - linting
- Deploy via `vercel` CLI or Vercel dashboard (connect GitHub repo)

## Important Notes
- ACIS = Arm Care Intelligence System. Always use full name on first mention per page, then "ACIS" subsequently.
- The system has two layers: "Longitudinal Layer" (season-long trends) and "Real-Time Layer" (in-game at-bat decisions). The Real-Time Layer is the focus of this knowledge base.
- Chase Spivey = "Founder & CEO", Sheldon McClelland = "Founder & COO" (never other titles)
- This is a Wyoming C-Corporation
- Never use em dashes in any copy
