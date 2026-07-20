import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  typescript: {
    tsconfigPath: "./tsconfig.pages.json",
  },
};

export default nextConfig;
