import type { NextConfig } from "next";
import withVercelToolbar from "@vercel/toolbar/plugins/next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/firm/answers",
        destination: "/answers",
        permanent: true,
      },
      {
        source: "/firm/answers/:slug",
        destination: "/answers/:slug",
        permanent: true,
      },
    ];
  },
};

/** Toolbar powers Vercel Comments on preview + local; optional on production via env. */
export default withVercelToolbar({
  enableInProduction: process.env.FAIRVIEW_CLIENT_REVIEW === "1",
})(nextConfig);
