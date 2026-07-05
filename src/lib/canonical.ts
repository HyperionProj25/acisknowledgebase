/**
 * Canonical facts for the ACIS Knowledge Base.
 *
 * This file is the ONLY place validated numbers live. Docs reference them
 * via the <Fact k="dot.path" /> MDX component so an update here propagates
 * everywhere. Do not type these values directly into content or components,
 * and do not add a value here without a source from the team.
 */

export const CANONICAL = {
  champion: {
    /** Validated champion model */
    model: "SP12",
    auc: "0.80",
    blindCohort: "252-arm blind cohort",
    blindCohortArms: 252,
    retrain: "June 2026 retrain",
    retrainDate: "June 2026",
  },
  production: {
    /** Production system */
    system: "DADEP 2.0",
    algorithm: "XGBoost",
    featureRange: "43-63",
    featureMin: 43,
    featureMax: 63,
    pitches: "10.7M",
    appearances: "311K+",
  },
  validatedPool: {
    pitchers: 178,
    seasons: "2023-2025",
    inSeasonCatchRate: "84.0%",
  },
  hittingBiomech: {
    /** Program names only; descriptions are Phase 2 content */
    programs: ["Arm Under Load", "TrackMan markerless capture"],
  },
  company: {
    name: "Baseline Analytics, Inc.",
    entityType: "Wyoming C-Corporation",
    product: "Arm Care Intelligence System (ACIS)",
    productShort: "ACIS",
    leadership: {
      ceo: { name: "Chase Spivey", title: "Founder & CEO" },
      coo: { name: "Sheldon McClelland", title: "Founder & COO" },
      chairman: { name: "Jeff Newman", title: "Executive Chairman" },
    },
  },
} as const;

/** Resolve a dot path like "champion.auc" against CANONICAL. */
export function getFact(path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (node, key) =>
        node && typeof node === "object"
          ? (node as Record<string, unknown>)[key]
          : undefined,
      CANONICAL
    );
  if (value === undefined || value === null || typeof value === "object") {
    throw new Error(`Unknown canonical fact: "${path}"`);
  }
  return String(value);
}

export default CANONICAL;
