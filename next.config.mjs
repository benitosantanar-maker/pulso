/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    // rss-parser y cheerio usan APIs Node.js — excluir del bundle cliente
    serverComponentsExternalPackages: ["rss-parser", "cheerio"],
  },
};

export default nextConfig;
