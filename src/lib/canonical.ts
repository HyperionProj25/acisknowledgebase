/**
 * Canonical facts for the ACIS Knowledge Base.
 *
 * This file is the ONLY place validated numbers live. Docs reference them
 * via the <Fact k="group.key" /> MDX component so an update here propagates
 * everywhere. Do not type these values directly into content or components,
 * and do not add a value here without a source from the team.
 *
 * Every fact carries an outbound flag. On pages whose frontmatter says
 * audience: outbound, <Fact> renders the outboundLabel when present and the
 * build FAILS if the page references an outbound: false fact.
 *
 * The groups are deliberately separate so magnitudes never get fused
 * downstream: `validation` is the 252-arm cohort study, `corpus` is the
 * training/evaluation data (NOT the cohort), `internal` never leaves the
 * building, and `priorStudy` is retired history.
 *
 * Product line everywhere: ACIS is a post-game system, not real-time.
 */

export interface CanonicalFact {
  value: string | number | readonly string[];
  outbound: boolean;
  outboundLabel?: string;
}

export const CANONICAL = {
  /** The headline: the SP12 252-cohort validation study. */
  validation: {
    auc: { value: "0.80", outbound: true, outboundLabel: "about 4 of 5" },
    priorAuc: { value: "0.72", outbound: true },
    cohort: { value: "blind, workload-matched, held-out", outbound: true },
    cohortSize: { value: 252, outbound: true },
    cases: { value: 126, outbound: true },
    controls: { value: 126, outbound: true },
    years: { value: "2023-2025", outbound: true },
    signal: { value: "sustained elevation", outbound: true },
    boxScoreCorr: { value: "~0 across 2,675 starts", outbound: true },
    earlySeason: {
      value: "holds 0.70 through first 65% of season (prior model 0.55)",
      outbound: true,
    },
    operatingPoint: {
      value: "~2/3 of events flagged, ~4/5 healthy cleared",
      outbound: true,
    },
  },

  /** Training/evaluation corpus. NOT the cohort; keep magnitudes distinct. */
  corpus: {
    pitches: { value: "10.7M", outbound: true },
    appearances: { value: "311K+", outbound: true },
    coverage: { value: "MLB 2015-2025 + MiLB 2021-2025", outbound: true },
  },

  /** Internal-only facts. Never rendered on outbound pages. */
  internal: {
    model: { value: "DADEP 2.0 (XGBoost)", outbound: false },
    champion: { value: "SP12", outbound: false },
    features: { value: 43, outbound: false },
    scale: { value: "0-100", outbound: false },
    flagThreshold: { value: 41, outbound: false },
    validWindow: { value: "5th start → ~Aug 31", outbound: false },
    topDrivers: {
      value: [
        "velocity decline",
        "release-point drift",
        "extension change",
      ],
      outbound: false,
    },
  },

  /**
   * Retired from outbound in favor of the 252-cohort AUC framing.
   * Internal history only.
   */
  priorStudy: {
    pool: { value: 178, outbound: false },
    catches: { value: 131, outbound: false },
    inSeason: { value: "84.0%", outbound: false },
    raw: { value: "73.6%", outbound: false },
  },
} as const;

function isFact(node: unknown): node is CanonicalFact {
  return (
    typeof node === "object" &&
    node !== null &&
    "value" in node &&
    typeof (node as CanonicalFact).outbound === "boolean"
  );
}

export function getCanonicalFact(path: string): CanonicalFact {
  const node = path
    .split(".")
    .reduce<unknown>(
      (current, key) =>
        current && typeof current === "object"
          ? (current as Record<string, unknown>)[key]
          : undefined,
      CANONICAL
    );
  if (!isFact(node)) {
    throw new Error(`Unknown canonical fact: "${path}"`);
  }
  return node;
}

export function formatFactValue(value: CanonicalFact["value"]): string {
  return Array.isArray(value) ? value.join(", ") : String(value);
}

/**
 * Resolve a fact for display. On outbound pages, internal facts are a build
 * error and outboundLabel wins over the raw value when present.
 */
export function resolveFact(
  path: string,
  options: { outboundPage: boolean }
): string {
  const fact = getCanonicalFact(path);
  if (options.outboundPage) {
    if (!fact.outbound) {
      throw new Error(
        `Fact "${path}" is internal-only (outbound: false) and cannot render on a page with audience: outbound`
      );
    }
    return fact.outboundLabel ?? formatFactValue(fact.value);
  }
  return formatFactValue(fact.value);
}

export default CANONICAL;
