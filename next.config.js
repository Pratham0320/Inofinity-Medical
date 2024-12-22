/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Enable support for the `app` directory
  },
  images: {
    domains: ['images.unsplash.com', 'utfs.io'], // Add your allowed domains here
  },
};

module.exports = nextConfig;
