import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mohtasham.dev" }],
        destination: "https://mohtasham.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
