/** @type {import('next').NextConfig} */
const nextConfig = {};

// const withNextIntl = require("next-intl/plugin")("./i18n.ts");
import withNextIntl from "next-intl/plugin";

export default withNextIntl("./i18n.ts");
