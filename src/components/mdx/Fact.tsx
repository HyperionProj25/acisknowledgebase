import { getFact } from "@/lib/canonical";

/**
 * Renders a canonical fact by dot path, e.g. <Fact k="champion.auc" />.
 * The only sanctioned way to put a validated number on a page: the value
 * lives in src/lib/canonical.ts and is updated exactly once.
 */
export default function Fact({ k }: { k: string }) {
  return <span className="font-mono font-medium text-brand-gold">{getFact(k)}</span>;
}
