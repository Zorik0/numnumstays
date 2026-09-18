import type { NextConfig } from "next";
import { stays } from "./src/data/stays";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async redirects() {
    // Keep links to the previous site working (/room1 ... /room7, *.html pages).
    const stayRedirects = stays.flatMap((stay) =>
      stay.legacyPaths.map((source) => ({
        source,
        destination: `/stays/${stay.slug}`,
        permanent: true,
      })),
    );

    return [
      ...stayRedirects,
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/animation.html", destination: "/", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/media/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        source: "/og/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
