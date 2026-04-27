/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    serverComponentsExternalPackages: ["rss-parser", "cheerio", "@anthropic-ai/sdk"],
    staticGenerationMaxConcurrency: 1,
    staticGenerationRetryCount: 1,
  },
  // Allow more time for static generation (RSS feeds can be slow)
  staticPageGenerationTimeout: 180,
};

export default nextConfig;
