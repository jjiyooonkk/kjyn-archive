import type { SiteMode } from '@/types';

const SUBDOMAIN_MAP: Record<string, SiteMode> = {
  journal: 'journal',
  brand: 'brand',
  design: 'design',
  space: 'space',
  exhibition: 'exhibition',
};

export function detectSiteModeFromHost(host: string): SiteMode {
  const sub = host.split('.')[0];
  return SUBDOMAIN_MAP[sub] || 'journal';
}
