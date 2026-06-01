import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Typescript errors ignore karne ke liye
  typescript: {
    ignoreBuildErrors: true,
  },
  // Images ke liye setup (tumhara pehle se sahi hai)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-mesy.pantheonsite.io',
      },
    ],
  },
};

export default nextConfig;