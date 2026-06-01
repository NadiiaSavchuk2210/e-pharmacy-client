import type { NextConfig } from 'next';

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  'https://e-pharmacy-backend-z5z2.onrender.com'
).replace(/\/$/, '');

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: '/product/:productId/opengraph-image',
        destination: '/product/:productId/og-image',
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [375, 640, 768, 1024, 1440, 1920],

    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
};

export default nextConfig;
