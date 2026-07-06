import type { NextConfig } from "next";

// Old POC routes now live under /archive. /validation and /glossary are NOT
// redirected because the live KB owns those routes.
const ARCHIVED_ROUTES = [
  "how-it-works",
  "state-vector",
  "reward-function",
  "limitations",
  "walkthrough",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...ARCHIVED_ROUTES.map((route) => ({
        source: `/${route}`,
        destination: `/archive/${route}`,
        permanent: false,
      })),
      // Docs that moved from their original Phase 1 slugs
      {
        source: "/model-methodology",
        destination: "/methodology",
        permanent: false,
      },
      {
        source: "/hitting-biomechanics",
        destination: "/biomechanics-roadmap",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
