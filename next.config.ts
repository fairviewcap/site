import type { NextConfig } from "next";

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

export default nextConfig;
