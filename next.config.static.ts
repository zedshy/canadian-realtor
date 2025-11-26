import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable API routes for static export
  // Forms will need to use PHP endpoints instead
};

export default nextConfig;

