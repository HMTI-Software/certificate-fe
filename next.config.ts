import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["certificate-be-production.up.railway.app"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
