import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add your CDN domain here when ready for production:
      // { protocol: "https", hostname: "your-cdn.com" },
    ],
  },
};

export default nextConfig;
