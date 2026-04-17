export type SiteMode = 'journal' | 'brand' | 'design' | 'space';

export interface SiteConfig {
  mode: SiteMode;
  title: string;
  subtitle: string;
  color: string; // tailwind color
}

export const SITES: Record<SiteMode, SiteConfig> = {
  journal: {
    mode: 'journal',
    title: 'Journal',
    subtitle: '오늘의 생각',
    color: 'amber',
  },
  brand: {
    mode: 'brand',
    title: 'Brand',
    subtitle: '브랜드 인사이트',
    color: 'blue',
  },
  design: {
    mode: 'design',
    title: 'Design',
    subtitle: '디자인 미감',
    color: 'rose',
  },
  space: {
    mode: 'space',
    title: 'Space',
    subtitle: '공간 기록',
    color: 'emerald',
  },
};

export interface Post {
  id: string;
  site: SiteMode;
  title: string;
  body: string;
  tags: string[];
  highlights: string[]; // special characteristics
  images: string[];     // blob URLs
  createdAt: string;
  updatedAt: string;
}

export type PromptCategory = 'question' | 'bible' | 'math' | 'science';

export interface Prompt {
  category: PromptCategory;
  text: string;
  source?: string; // e.g. "2024 수능 수학 15번"
  answer?: string; // for math problems
}
