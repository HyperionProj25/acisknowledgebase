import Link from "next/link";
import {
  LayoutDashboard,
  PlayCircle,
  GitBranch,
  Grid3X3,
  SlidersHorizontal,
  BarChart3,
  BookOpen,
  AlertCircle,
} from "lucide-react";

const ARCHIVED_PAGES = [
  {
    href: "/archive/overview",
    label: "POC Overview",
    description: "The original landing page: positioning, two-layer architecture, key stats.",
    icon: LayoutDashboard,
  },
  {
    href: "/archive/walkthrough",
    label: "Game Day Walkthrough",
    description: "The 8-scene narrative walkthrough of an in-game pull recommendation.",
    icon: PlayCircle,
  },
  {
    href: "/archive/how-it-works",
    label: "How It Works",
    description: "The animated data pipeline and reinforcement learning primer.",
    icon: GitBranch,
  },
  {
    href: "/archive/state-vector",
    label: "State Vector",
    description: "The six input features the POC agent observed each at-bat.",
    icon: Grid3X3,
  },
  {
    href: "/archive/reward-function",
    label: "Reward Function",
    description: "The interactive reward-weight explorer with personality gauge.",
    icon: SlidersHorizontal,
  },
  {
    href: "/archive/validation",
    label: "POC Validation",
    description: "The POC-era training curve, criteria cards, and baselines chart.",
    icon: BarChart3,
  },
  {
    href: "/archive/glossary",
    label: "POC Glossary",
    description: "The original 24-term glossary, centered on the POC's RL vocabulary.",
    icon: BookOpen,
  },
  {
    href: "/archive/limitations",
    label: "Limitations & Roadmap",
    description: "The POC's honest limitations list and its March 2026 roadmap.",
    icon: AlertCircle,
  },
];

export default function ArchiveIndexPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Archive</h1>
      <p className="text-white/60 max-w-2xl mb-2">
        These pages preserve the March 2026 reinforcement learning proof of
        concept exactly as it was presented, including its numbers, framing,
        and interactive demos. They are historical record, not current claims.
      </p>
      <p className="text-white/40 max-w-2xl mb-10 text-sm">
        For the current system, start from the{" "}
        <Link href="/" className="text-brand-gold hover:text-brand-gold-light">
          live knowledge base
        </Link>
        .
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ARCHIVED_PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group bg-surface-card border border-surface-border rounded-xl p-5 hover:border-brand-gold/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <page.icon size={18} className="text-warning" />
              <h2 className="font-semibold text-white group-hover:text-brand-gold transition-colors">
                {page.label}
              </h2>
            </div>
            <p className="text-sm text-white/50">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
