import type { MetadataRoute } from 'next';
import { PUBLIC_ICONS } from '@/lib/icon-approval';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    ...PUBLIC_ICONS.map(({ name }) => ({ url: `${SITE_URL}/icons/${name}` })),
  ];
}
