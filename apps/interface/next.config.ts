import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Trace from the monorepo root so _content/ (which lives two levels up
  // from apps/interface) is included in the serverless bundle on Vercel.
  outputFileTracingRoot: path.join(__dirname, "../../"),
  outputFileTracingIncludes: {
    "/**/*": ["../../_content/**/*"],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here if needed
});

export default withMDX(nextConfig);
