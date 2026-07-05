import type { ReactNode } from "react";

/**
 * Visible placeholder for Phase 2 content. The children describe what
 * belongs in the slot; they are never a substitute for the content itself.
 */
export default function TodoContent({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 rounded-xl border-2 border-dashed border-warning/40 bg-warning/5 p-5">
      <p className="text-xs font-mono uppercase tracking-wider text-warning mb-2">
        TODO(content)
      </p>
      <div className="text-white/50 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
