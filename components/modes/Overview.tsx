'use client';

import { navPatterns } from '@/lib/navPatterns';

interface OverviewProps {
  onSelectPattern: (patternId: string) => void;
}

export default function Overview({ onSelectPattern }: OverviewProps) {
  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Navigation Patterns
        </h1>
        <p className="text-slate-600 mb-8">
          Select a pattern to view it in detail or compare multiple patterns side by side.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {navPatterns.map((pattern) => (
            <div
              key={pattern.id}
              onClick={() => onSelectPattern(pattern.id)}
              className="text-left rounded-lg border border-slate-300 overflow-hidden hover:shadow-lg hover:border-slate-400 transition-all cursor-pointer group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectPattern(pattern.id);
                }
              }}
            >
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors min-h-32 flex items-center justify-center pointer-events-none">
                <div className="text-slate-600 font-semibold text-center">
                  {pattern.label} Preview
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  {pattern.label}
                </h2>
                <p className="text-slate-600">{pattern.descriptor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
