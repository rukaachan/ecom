import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production: Reduced container size
  output: process.platform === "win32" ? undefined : "standalone",

  // Performance & Security
  compress: true,
  poweredByHeader: false,

  // Stable optimizations (works in Next.js 15.5.x)
  experimental: {
    // Optimize imports: Smaller bundles = less memory
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
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    qualities: [25, 50, 75, 100],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
