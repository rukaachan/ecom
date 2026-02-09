import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Production optimization: Reduces container size
  output: "standalone",

  // Performance & Security
  compress: true,
  poweredByHeader: false,

  // Development Memory Optimization
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 10 * 1000, // 10 seconds
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 1,
  },

  experimental: {
    // Optimizes barrel file imports to reduce memory usage
    optimizePackageImports: [
      "lucide-react",
      "@tabler/icons-react",
      "recharts",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-tooltip",
      "dayjs",
      "zod",
    ],
  },

  images: {
    // Enable modern image formats
    formats: ["image/webp", "image/avif"],

    // Increase cache TTL for better performance
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week

    // Configure quality settings
    qualities: [25, 50, 75, 100],

    // Speed up dev by skipping image optimization
    unoptimized: isDev,

    // No remote patterns needed for local image storage
  },
};

export default nextConfig;
