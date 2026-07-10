import type { NextConfig } from "next";

const cdsAssetBaseUrl = process.env.CDS_ASSET_BASE_URL;
const cdsRemotePattern =
  cdsAssetBaseUrl && (() => {
    const url = new URL(cdsAssetBaseUrl);
    url.pathname = "/**";
    return url;
  })();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-optimized.imweb.me",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      ...(cdsRemotePattern ? [cdsRemotePattern] : []),
    ],
  },
};

export default nextConfig;
