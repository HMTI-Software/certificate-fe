import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "certificate-be-production.up.railway.app",
        pathname: "/**",
      },
    ],
    domains: ["certificate-be-production.up.railway.app"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
