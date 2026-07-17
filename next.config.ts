import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/naor7749/car-price-ml-benchmark/**",
      },
    ],
  },
};

export default nextConfig;
