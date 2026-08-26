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
        source: "/",
        has: [{ type: "host", value: "mohtasham.dev" }],
        destination: "https://www.mohtasham.dev/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "mohtasham.dev" }],
        destination: "https://www.mohtasham.dev/:path*",
        permanent: true,
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
