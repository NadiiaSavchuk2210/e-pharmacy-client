import { BASE_URL } from '@/shared/constants/constants';

import type { MetadataRoute } from 'next';

const indexedRoutes = ['/', '/home', '/medicine-store', '/medicine', '/feature'];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexedRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'monthly' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
