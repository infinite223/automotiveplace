// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/id/237/200/300",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        pathname: "/v1/storage/**",
      },
      { protocol: "https", hostname: "cdn1.iconfinder.com" },
      { protocol: "https", hostname: "fra.cloud.appwrite.io" },
    ],
  },
};

export default withNextIntl(nextConfig);
