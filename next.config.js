/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    suppressHydrationWarning: true,
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
