'use client';

import { navPatterns } from '@/lib/navPatterns';
import GridBody from '@/components/body/GridBody';

interface SingleViewProps {
  patternId: string;
}

export default function SingleView({ patternId }: SingleViewProps) {
  const pattern = navPatterns.find((p) => p.id === patternId);

  if (!pattern) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600">Pattern not found</p>
      </div>
    );
  }

  const NavComponent = pattern.component;

  return (
    <div className="flex flex-col min-h-screen">
      <NavComponent />
      <GridBody />
    </div>
  );
}
