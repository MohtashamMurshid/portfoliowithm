import type { NextConfig } from "next";

const contactRedirects = [
  {
    source: "/x",
    destination: "https://x.com/mohtashamdotdev",
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
] satisfies NonNullable<NextConfig["redirects"]> extends () => Promise<infer T>
  ? T
  : never;

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return contactRedirects;
  },
};

export default nextConfig;
