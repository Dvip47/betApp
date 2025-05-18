
/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    reactStrictMode: true,
    images: {
      domains: ["localhost"],
      remotePatterns: [
      ],
    },
  };
  
  module.exports = nextConfig;
  