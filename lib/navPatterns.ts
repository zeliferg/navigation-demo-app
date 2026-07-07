import { ComponentType } from 'react';
import PatternANav from '@/components/navs/pattern-a/PatternANav';
import PatternB from '@/components/navs/pattern-b/PatternB';
import PatternC from '@/components/navs/pattern-c/PatternC';
import PatternD from '@/components/navs/pattern-d/PatternD';

export interface NavPattern {
  id: string;
  label: string;
  descriptor: string;
  component: ComponentType<any>;
}

export const navPatterns: NavPattern[] = [
  {
    id: 'pattern-a',
    label: 'Pattern A',
    descriptor: 'Sidebar with context switcher — collapsible left nav + top bar',
    component: PatternANav,
  },
  {
    id: 'pattern-b',
    label: 'Pattern B',
    descriptor: 'Vertical sidebar navigation',
    component: PatternB,
  },
  {
    id: 'pattern-c',
    label: 'Pattern C',
    descriptor: 'Tab-based navigation',
    component: PatternC,
  },
  {
    id: 'pattern-d',
    label: 'Pattern D',
    descriptor: 'Bottom navigation with icons',
    component: PatternD,
  },
];
