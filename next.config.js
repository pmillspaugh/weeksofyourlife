const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [["@onlook/nextjs", { root: path.resolve(".") }]],
  },
};

module.exports = nextConfig;
