/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  experimental: {
    appDir: true,
  },
  env: {
    AUTH_KEY: process.env.AUTH_KEY,
  }
}

// module.exports = nextConfig
