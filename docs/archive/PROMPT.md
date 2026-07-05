# Claude Code Prompt

Copy and paste the following prompt into Claude Code from inside the `acis-knowledge-base/` project directory.

---

## The Prompt

```
Read CLAUDE.md, docs/PRD.md, and docs/content.json thoroughly before writing any code.

Build the ACIS Knowledge Base interactive website as specified in the PRD. This is a Next.js 14+ App Router project with Tailwind CSS, Framer Motion, and Recharts, deployable to Vercel.

Key requirements:
1. Initialize the project with: npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
2. Install dependencies: npm install framer-motion recharts lucide-react
3. All content comes from docs/content.json. Create a typed content loader in lib/content.ts. Never hardcode content strings in components.
4. Brand colors and design tokens are defined in CLAUDE.md. Set them up in tailwind.config.ts as custom colors.
5. Check for a "Baseline _ Source Files" folder in the project root. If brand assets (logos, fonts) exist there, integrate them. If not, use text-based branding with the Sunglow Gold (#F5A623) and navy (#1A2332) palette.
6. Build all 7 pages as specified in the PRD with their full interactive elements:
   - Overview (/) with animated stat counters and layer architecture cards
   - How It Works (/how-it-works) with the interactive clickable data flow pipeline and RL explainer
   - State Vector (/state-vector) with 6 expandable feature cards with color-coded thresholds
   - Reward Function (/reward-function) with 5 live sliders, personality gauge, outcome simulation cards, and preset buttons
   - Validation (/validation) with animated training curve (Recharts), 3 metric cards, and baselines comparison bar chart
   - Glossary (/glossary) with search input and category filter pills
   - Limitations (/limitations) with limitation cards and roadmap timeline
7. The Reward Function Explorer is the centerpiece. Make it feel premium: sliders update the personality gauge and outcome scenarios in real time, preset buttons snap to predefined configurations, everything is smooth and responsive.
8. For the Training Curve on the Validation page, generate ~50 plausible synthetic data points showing: start at ~0.2 reward, rapid climb to ~0.8 by 50K steps, then plateau with oscillation between 0.6 and 1.0 through 500K steps. Add the two annotations from content.json.
9. Navigation: fixed top nav with brand identity, gold accent underline on active item, mobile hamburger menu.
10. Animations: Framer Motion throughout. Fade-up with stagger for cards/lists. Spring physics for interactive elements. Count-up for statistics on scroll. Respect prefers-reduced-motion.
11. The data flow pipeline on How It Works should be the most visually impressive element. Animated nodes connected by flowing lines/particles. Each node clickable to expand detail. A "Play All" button that sequences through the entire flow.

Build the complete application. Every page should be functional with real content from content.json. Make it production-ready and deployable to Vercel.
```

---

## After the Build

Once Claude Code finishes building:

1. **Test locally:** `npm run dev` and verify all 7 pages, all interactive elements
2. **Deploy to Vercel:**
   - Push to a GitHub repo
   - Go to vercel.com, import the repo
   - Framework: Next.js (auto-detected)
   - Deploy
3. **Share the URL** with Sheldon and Jeff

## If You Need to Iterate

For follow-up prompts to Claude Code, here are useful patterns:

- "The reward function sliders feel laggy. Optimize the RewardExplorer component for smoother real-time updates."
- "Add a progress tracker at the top of the site that shows which sections the user has visited."
- "The data flow pipeline animation needs more visual impact. Add particle effects flowing between nodes."
- "Make the glossary terms linkable from other pages. When a glossary term appears in body text, make it a hoverable tooltip."
- "Add a 'Copy talking point' button to each validation metric card."
- "The mobile nav needs work. The hamburger menu should slide in from the right with a dark overlay."
