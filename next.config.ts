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
    return ARCHIVED_ROUTES.map((route) => ({
      source: `/${route}`,
      destination: `/archive/${route}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
