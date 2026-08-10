import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "export", // static HTML, no server
  images: { unoptimized: true }, // mandatory: image optimization needs a server
  trailingSlash: true, // emits dir/index.html — safest on Pages
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // NO basePath. NO assetPrefix. Root site.
};

export default createMDX()(nextConfig);
