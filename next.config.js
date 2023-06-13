/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["media.tenor.com"],
  },
  env: {
    RAPID_KEY: process.env.RAPID_KEY,
    RAPID_HOST: process.env.RAPID_HOST,
  },
};

module.exports = nextConfig;
