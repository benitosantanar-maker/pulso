/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    // Paquetes que deben ejecutarse en Node.js (no bundleados por webpack)
    serverComponentsExternalPackages: ["rss-parser", "cheerio", "@anthropic-ai/sdk"],
  },
  // Tiempo extra para generación estática (RSS feeds pueden ser lentos)
  staticPageGenerationTimeout: 180,
};

export default nextConfig;
