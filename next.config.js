/** @type {import('next').NextConfig} */
const webpack = require("webpack")

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["v0.blob.com"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // This adds a plugin to provide useEffectEvent
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: ["react"],
      }),
    )

    return config
  },
}

module.exports = nextConfig
