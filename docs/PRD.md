# ACIS Knowledge Base - Product Requirements Document

## 1. Purpose

Build an interactive, deployable website that serves as the definitive training and onboarding resource for the Arm Care Intelligence System (ACIS) Real-Time Layer. The audience is Baseline Analytics leadership: Chase Spivey (Founder & CEO), Sheldon McClelland (Founder & COO), and Jeff Newman (Executive Chairman).

The site should make technical concepts tangible through interaction, not just documentation. Someone who spends 20 minutes on this site should be able to confidently explain ACIS to an investor, MLB executive, or advisory board member.

## 2. Tech Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Framework | Next.js 14+ (App Router) | Same stack as StakeholderPulse; Vercel-native |
| Styling | Tailwind CSS | Rapid, consistent styling |
| Animations | Framer Motion | Smooth, performant UI animations |
| Charts | Recharts | React-native charting, good for the training curve |
| Icons | Lucide React | Clean, consistent icon set |
| Deployment | Vercel | One-click deploy, free tier sufficient |

No backend, no database, no authentication. Pure static site with client-side interactivity.

## 3. Sitemap & Page Specifications

### 3.1 Navigation
- Fixed top nav bar with Baseline Analytics branding (logo if available from source files, otherwise text logo)
- Nav items: Overview | How It Works | State Vector | Reward Function | Validation | Glossary | Limitations
- Active state highlighting with Sunglow Gold underline
- Smooth scroll behavior when navigating
- Mobile: hamburger menu

### 3.2 Page: Overview (/)
**Hero Section**
- Large heading: "Arm Care Intelligence System (ACIS)"
- Subheading: "AI-Powered Pitcher Injury Prevention"
- One-paragraph positioning statement: ACIS monitors pitcher workload and biomechanical signals, then recommends pull/leave-in decisions at-bat by at-bat in real time. Trained on 750,000+ real MLB at-bats from Statcast data (2015-2025).
- Two-layer architecture summary with animated cards:
  - Longitudinal Layer card: season-long trends, 30-day injury horizon
  - Real-Time Layer card: in-game monitoring, at-bat decisions (highlighted as current focus)
- Key stats bar (animated count-up on scroll):
  - "750K+" at-bats analyzed
  - "7.75M" raw pitches processed
  - "10 seasons" of MLB data
  - "3/3" validation criteria passed

**The Problem Section**
- Brief statement on pitcher injury costs ($15-30M per UCL tear)
- Why current approaches fail (reactive, not predictive)
- What ACIS changes (real-time, data-driven, learns from outcomes)

### 3.3 Page: How It Works (/how-it-works)
**Interactive Data Flow Pipeline**
This is the signature interactive element. Build an animated node graph showing the full data pipeline:

```
[Statcast API] --> [Preprocessor] --> [At-Bat Features] --> [Gymnasium Env] --> [PPO Training] --> [Trained Model] --> [Streamlit App]
  7.75M pitches    build_atbat_       6 features +        pitcher_env.py     train_agent.py     .zip file          3-tab interface
                   features.py        2 labels
```

**Behavior:**
- Nodes appear sequentially with a flowing animation (data particles moving between nodes)
- Each node is clickable and expands to show detail:
  - Statcast: "MLB's pitch-tracking system. Every pitch since 2015. Velocity, spin, pitch type, game context."
  - Preprocessor: "Compresses 7.75M pitch-level records into one row per pitcher per at-bat. Matches the cadence a pitching coach would use."
  - Features: Links to the State Vector page. Shows the 6 feature names.
  - Environment: "Replays historical games. Picks a random pitcher/game, loads at-bat rows, steps through one at a time."
  - Training: "500K at-bat decisions. PPO algorithm adjusts neural network weights based on rewards. Stable Baselines3 library."
  - Model: "Small neural network. 6 inputs, binary output (pull or leave in). Weights encode learned injury patterns."
  - App: "Streamlit. Three tabs: Game Demo, Training Evidence, Mock Scenario."
- Clicking a node highlights it and dims others
- A "Play All" button animates through the entire flow sequentially

**RL Explainer Section**
Below the pipeline, a concise RL primer:
- "Most ML = show labeled examples. RL = learn by trial and error."
- The dog analogy: "You don't explain why sitting is good. You reward the sit. The dog figures it out."
- Three-card layout: State (the situation) | Action (the choice) | Reward (the score)
- PPO explainer: "The specific algorithm. 'Proximal' = cautious updates. Doesn't overreact to one game."
- Episodes & Timesteps: "1 episode = 1 pitcher's game appearance. 1 timestep = 1 at-bat decision. 500K timesteps = 500K decisions across thousands of games."

### 3.4 Page: State Vector (/state-vector)
**6 Interactive Feature Cards**
Grid layout (2x3 on desktop, 1-column on mobile). Each card:
- Feature name (code-styled: `velo_drop_from_baseline`)
- Plain English name ("Velocity Drop")
- Icon (relevant Lucide icon)
- Brief description visible by default
- Click/expand for:
  - Detailed explanation
  - Why it matters for injury detection
  - Threshold values where applicable (ACWR: >1.2 yellow, >1.5 red)
  - Example: "A value of -2.5 means the pitcher is throwing 2.5 mph slower than their seasonal average"
- Color-coded severity indicator where applicable (green/yellow/red zones)

**Feature cards content:**

1. **velo_drop_from_baseline** - "Velocity Drop" - How far current fastball velocity has dropped from seasonal average. Negative = slower. One of the clearest fatigue signals in baseball.
2. **spin_drop_from_baseline** - "Spin Rate Drop" - Same concept for spin rate (RPM). Drops indicate grip weakness or mechanical breakdown.
3. **pitch_count_so_far** - "Pitch Count" - Cumulative pitches thrown in this game. More pitches = more fatigue.
4. **stress_accumulated** - "Arm Stress (ACWR)" - Acute:Chronic Workload Ratio. Acute = 7-day pitches. Chronic = 28-day average / 4. Ratio near 1.0 = normal. >1.2 = yellow flag. >1.5 = red flag.
5. **inning** - "Inning" - Current inning. Later innings provide additional fatigue context.
6. **score_diff** - "Score Differential" - Team score minus opponent. Game-state context. NOTE: Stubbed to 0 in current POC.

**Outcome Labels Section**
Below the cards, explain the two outcome labels:
- `il_within_14d`: Did the pitcher go on the Injured List within 14 days?
- `velo_collapse_later`: Did velocity collapse (>3.0 mph drop from opening pace) later in the same game?

### 3.5 Page: Reward Function (/reward-function)
**This is the crown jewel interactive element.**

**Reward Explorer Widget**
A full-width interactive panel with:

**Left side - 5 Sliders:**
| Slider | Default | Range | Label |
|--------|---------|-------|-------|
| Leave in, healthy | +1.0 | 0 to +2.0 | "Correct conservative call" |
| Leave in, goes on IL | -4.0 | -10.0 to 0 | "Missed injury signal" |
| Pull, collapse later | +0.5 | 0 to +2.0 | "Good catch" |
| Pull, false alarm | -0.1 | -2.0 to 0 | "False alarm cost" |
| Pull, IL but no collapse | 0.0 | -1.0 to +1.0 | "Ambiguous pull" |

**Right side - Live Personality Gauge:**
A visual indicator showing where the current reward configuration places the agent on a spectrum:
- Left end: "Ultra Conservative" (rarely pulls, avoids false alarms)
- Center: "Balanced"
- Right end: "Ultra Aggressive" (pulls frequently, prioritizes injury catches)

The gauge should update in real time as sliders move.

**Below - Outcome Simulation:**
A simple visual showing 4 hypothetical scenarios and the reward the agent would receive under the current slider settings:
1. "Healthy pitcher, left in through 7 innings" -> shows reward
2. "Pitcher goes on IL 10 days later, was left in" -> shows reward
3. "Agent pulls pitcher in 5th, velocity collapsed in 7th" -> shows reward
4. "Agent pulls pitcher in 4th, pitcher was fine" -> shows reward

Each scenario card updates live as sliders change. Color-coded: green for positive reward, red for negative.

**Preset Buttons:**
- "Current POC" (loads the actual values used)
- "Conservative" (high false alarm cost, low injury miss penalty)
- "Aggressive" (high injury miss penalty, low false alarm cost)
- "Balanced" (equal weighting)
- "Reset to Default"

**Insight Callout:**
A styled callout box explaining: "The reward function shapes the agent's personality. There is no universally correct answer. In production, these weights would be calibrated with medical staff, coaching staff, and team management."

### 3.6 Page: Validation (/validation)
**Training Curve**
- Animated Recharts line chart showing reward over 500K timesteps
- Y-axis: average reward per episode (0 to 1.2)
- X-axis: timesteps (0 to 500K)
- The curve should show: start at ~0.2, rapid climb to ~0.8 by 50K steps, plateau with oscillation (0.6-1.0) through 500K
- Generate plausible synthetic data points for this curve (approximately 50 data points showing this pattern)
- Annotations on the chart:
  - "Agent discovers basic pattern" at the inflection point (~50K)
  - "Plateau: learned what it can from this signal" at ~200K
- Hover shows exact values

**Three Validation Criteria Cards**
Animated on scroll-into-view:

1. **Reward Improvement** - 0.710 -> 0.818 (+15.2%) - Animated progress bar filling to show improvement. "The agent genuinely learned. A random agent scores ~0.0. Always-leave-in scores ~0.7. ACIS at 0.818 outperforms the naive baseline."

2. **Pull Rate Differential** - 6.8% pre-injury vs 5.2% healthy (+31% differential) - Two side-by-side bars. "The most important signal. The agent pulls injury-bound pitchers more often than healthy ones. It learned a real discriminating pattern."

3. **Case Studies** - 5 MLB pitchers correctly flagged - Counter animation (0 -> 5). "Five specific games where ACIS recommended pulling a pitcher, and that pitcher went on the IL within 14 days."

**Baselines Comparison**
A simple bar chart comparing:
- Random agent: ~0.0
- Always leave in: ~0.7
- ACIS agent: 0.818

### 3.7 Page: Glossary (/glossary)
- Search input at top (filters terms as you type)
- Category filter pills: All | RL Concepts | Data | Infrastructure | Baseball
- 24 terms displayed as expandable accordion items
- Term name bold, definition expands on click
- All terms from content.json glossary array

### 3.8 Page: Limitations & Roadmap (/limitations)
**Known Limitations**
Cards or list items, each with an icon and honest explanation:
1. Score differential stubbed to 0
2. Partial pitcher name mappings (~20 of ~1,600)
3. No live data feed (historical replay only)
4. Agent tuned aggressive for demos
5. ACWR is approximate
6. No medical validation

**Roadmap / What's Next**
Forward-looking section:
- Live Statcast integration
- Expanded pitcher coverage
- MLB partnership pilot (pending MLBPA approval)
- Medical/coaching staff calibration of reward weights
- Longitudinal Layer integration
- Production-grade workload model

## 4. Design Specifications

### Color System
```
--brand-gold: #F5A623       (primary accent, CTAs, highlights)
--brand-gold-light: #FBD38D (hover states, backgrounds)
--brand-gold-dark: #C77D18  (active states)
--navy: #1A2332             (headings, dark backgrounds)
--navy-light: #2D3748       (secondary text on dark)
--gray-700: #4A5568         (body text)
--gray-500: #A0AEC0         (secondary text)
--gray-100: #F7FAFC         (section backgrounds)
--white: #FFFFFF
--success: #38A169
--warning: #ECC94B
--danger: #E53E3E
```

### Typography
- Headings: Inter (or system sans-serif), bold
- Body: Inter (or system sans-serif), regular
- Code/technical: JetBrains Mono or Fira Code (monospace)
- Scale: 14px body, 18px lead, 24px H3, 30px H2, 42px H1

### Animation Guidelines
- Use Framer Motion for all animations
- Entry animations: fade-up with stagger for lists/cards
- Interactive elements: spring physics (damping: 20, stiffness: 300)
- Data flow pipeline: custom path animation with SVG
- Numbers: count-up animation on scroll into view
- Transitions between pages: subtle fade
- Respect `prefers-reduced-motion`

### Layout
- Max content width: 1200px, centered
- Section padding: 80px vertical (desktop), 40px (mobile)
- Card grid: 12px gap
- Full-bleed sections alternate between white and gray-100 backgrounds

## 5. Deployment

### Vercel Setup
1. Push repo to GitHub
2. Connect to Vercel
3. Framework preset: Next.js (auto-detected)
4. No environment variables needed
5. Deploy

### Domain (Optional)
Chase can configure a custom subdomain later if desired (e.g., acis.baselineanalytics.com).

## 6. Success Criteria

After 20 minutes on this site, a user should be able to:
1. Explain what ACIS does in one sentence
2. Describe the two-layer architecture
3. Name the 6 state vector features and explain why they matter
4. Explain how the reward function shapes agent behavior
5. Cite the 3 validation results
6. Honestly articulate what the POC can and cannot do
