import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io", // domínio das imagens da HP API
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;