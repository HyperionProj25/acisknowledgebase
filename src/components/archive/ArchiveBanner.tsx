import Link from "next/link";
import { Archive } from "lucide-react";

/**
 * Persistent banner shown on every /archive page. The archive preserves the
 * March 2026 RL proof of concept as history; this banner keeps anyone from
 * mistaking it for the current system.
 */
export default function ArchiveBanner() {
  return (
    <div className="sticky top-16 z-[60] h-10 bg-surface-elevated border-b border-warning/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center gap-2 text-xs sm:text-sm">
        <Archive size={14} className="text-warning shrink-0" />
        <span className="font-semibold text-warning shrink-0">Archive</span>
        <span className="text-white/60 truncate">
          March 2026 RL proof of concept. Not the current system.
        </span>
        <Link
          href="/"
          className="ml-auto shrink-0 text-brand-gold hover:text-brand-gold-light transition-colors"
        >
          Current KB
        </Link>
      </div>
    </div>
  );
}
