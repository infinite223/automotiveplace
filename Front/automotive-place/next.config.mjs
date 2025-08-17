import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    turbo: {
      rules: {}, // tu możesz definiować dodatkowe reguły, ale pusty obiekt wystarczy
    },
  },
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
    ],
  },
};

// const withBundleAnalyzer = require("next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

export default withNextIntl(nextConfig);
