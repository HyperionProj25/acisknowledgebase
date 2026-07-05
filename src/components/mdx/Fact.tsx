import { resolveFact } from "@/lib/canonical";

/**
 * Renders a canonical fact by dot path, e.g. <Fact k="validation.auc" />.
 * The only sanctioned way to put a validated number on a page: the value
 * lives in src/lib/canonical.ts and is updated exactly once.
 *
 * DocPage passes the doc's audience through. On audience: outbound pages,
 * outbound-labeled facts render their label and internal (outbound: false)
 * facts throw, failing the build.
 */
export default function Fact({
  k,
  audience,
}: {
  k: string;
  audience?: string;
}) {
  const outboundPage = (audience ?? "").trim().toLowerCase() === "outbound";
  return (
    <span className="font-mono font-medium text-brand-gold">
      {resolveFact(k, { outboundPage })}
    </span>
  );
}
