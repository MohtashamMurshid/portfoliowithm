import type { NextConfig } from "next";

const contactRedirects = [
  {
    source: "/x",
    destination: "https://x.com/mohtashamdotdev",
    permanent: true,
  },
  {
    source: "/github",
    destination: "https://github.com/mohtashammurshid",
    permanent: true,
  },
  {
    source: "/ig",
    destination: "https://www.instagram.com/mohtashammurshid/",
    permanent: true,
  },
  {
    source: "/linkedin",
    destination: "https://www.linkedin.com/in/mohtashammurshid/",
    permanent: true,
  },
  {
    source: "/ws",
    destination: "https://wa.me/60177433260",
    permanent: false,
  },
] satisfies Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>;

const nextConfig: NextConfig = {
  trailingSlash: false,
  outputFileTracingIncludes: {
    "/api/markdown": ["./content/blog/*.md"],
    "/og": [
      "./public/**/*",
      "./app/og/fonts/**/*",
      // Sharp loads libvips at runtime; file tracing can miss the shared library.
      "./node_modules/@img/sharp-libvips-*/lib/**/*",
    ],
  },
  experimental: {
    viewTransition: true,
  },
  images: {
    minimumCacheTTL: 86_400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [{
      // Thumbnail filenames contain a hash of their contents.
      source: "/projects/thumbnails/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },
  async rewrites() {
    return [
      {
        source: "/apple-touch-icon.png",
        destination: "/apple-icon",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/developers",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "mohtasham.dev" }],
        destination: "https://www.mohtasham.dev/",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "mohtasham.dev" }],
        destination: "https://www.mohtasham.dev/:path*",
        statusCode: 301,
      },
      {
        source: "/archive",
        destination: "/work#archive",
        permanent: true,
      },
      ...contactRedirects,
    ];
  },
};

export default nextConfig;
