'use client';

import { SITES } from '@/types';
import type { SiteMode } from '@/types';

interface SiteNavProps {
  current: SiteMode;
}

const colorMap: Record<string, string> = {
  amber: 'bg-amber-600',
  blue: 'bg-sky-700',
  rose: 'bg-rose-400',
  emerald: 'bg-emerald-700',
};

export default function SiteNav({ current }: SiteNavProps) {
  const sites = Object.values(SITES);

  return (
    <nav className="flex items-center gap-1 text-sm">
      {sites.map((site) => {
        const isActive = site.mode === current;
        const domain = `${site.mode}.kjyn.kr`;
        return (
          <a
            key={site.mode}
            href={`https://${domain}`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
              isActive
                ? 'bg-foreground text-background'
                : 'hover:bg-muted'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${colorMap[site.color]}`} />
            {site.title}
          </a>
        );
      })}
    </nav>
  );
}
