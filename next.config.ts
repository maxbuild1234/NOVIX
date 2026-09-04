import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Defaults to .next, so Vercel needs no configuration. Set NEXT_DIST_DIR to
  // build into a separate folder when a dev server is already running on
  // this project — otherwise the build replaces the files dev is serving.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // The floating dev badge sits over the bottom-left of every page, on top
  // of the hero's status rail.
  devIndicators: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  poweredByHeader: false,
};

export default nextConfig;
