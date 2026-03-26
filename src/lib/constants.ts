export const COLORS = {
  brandGold: '#F5A623',
  brandGoldLight: '#FBD38D',
  brandGoldDark: '#C77D18',
  navy: '#1A2332',
  navyLight: '#2D3748',
  gray700: '#4A5568',
  gray500: '#A0AEC0',
  gray100: '#F7FAFC',
  white: '#FFFFFF',
  success: '#38A169',
  warning: '#ECC94B',
  danger: '#E53E3E',
  // Dark theme surfaces
  surfaceBase: '#0D0D0D',
  surfaceCard: '#161616',
  surfaceElevated: '#1E1E1E',
} as const;

export const NAV_ITEMS = [
  { label: 'Overview', href: '/' },
  { label: 'Walkthrough', href: '/walkthrough' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'State Vector', href: '/state-vector' },
  { label: 'Reward Function', href: '/reward-function' },
  { label: 'Validation', href: '/validation' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Limitations', href: '/limitations' },
] as const;

export const ANIMATION = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  stagger: {
    animate: { transition: { staggerChildren: 0.1 } },
  },
  spring: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300,
  },
} as const;
