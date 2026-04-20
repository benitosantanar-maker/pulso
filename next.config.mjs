/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    // rss-parser usa módulos Node.js nativos — excluir del bundle cliente
    serverComponentsExternalPackages: ["rss-parser"],
  },
};

export default nextConfig;
