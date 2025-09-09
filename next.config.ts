import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable modern image formats
    formats: ["image/webp", "image/avif"],

    // Increase cache TTL for better performance
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week

    // Configure quality settings
    qualities: [25, 50, 75, 100],

    // No remote patterns needed for local image storage
  },
};

export default nextConfig;
