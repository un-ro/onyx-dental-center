import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // serverExternalPackages: ["yjs"],
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        // port: '',
        // pathname: '/u/**',
      },
    ],
  },
};

export default nextConfig;
