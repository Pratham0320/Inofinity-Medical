/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'utfs.io'], // Add your allowed domains here
  },
};

module.exports = nextConfig;
