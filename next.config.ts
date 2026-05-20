import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net", pathname: "/gh/devicons/**" },
      { protocol: "https", hostname: "cdn.jsdelivr.net", pathname: "/npm/simple-icons/**" },
    ],
  },
};

export default nextConfig;
