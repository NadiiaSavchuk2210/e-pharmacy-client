import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  async rewrites() {
    return [
      {
        source: '/product/:productId/opengraph-image',
        destination: '/product/:productId/og-image',
      },
    ];
  },
};

export default nextConfig;
