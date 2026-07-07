'use client';

import { useState } from 'react';
import { navPatterns } from '@/lib/navPatterns';
import GridBody from '@/components/body/GridBody';

export default function CompareView() {
  const [pattern1, setPattern1] = useState(navPatterns[0].id);
  const [pattern2, setPattern2] = useState(navPatterns[1].id);

  const patternA = navPatterns.find((p) => p.id === pattern1);
  const patternB = navPatterns.find((p) => p.id === pattern2);

  if (!patternA || !patternB) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600">Pattern not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Compare Patterns
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Left Pattern
            </label>
            <select
              value={pattern1}
              onChange={(e) => setPattern1(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {navPatterns.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Right Pattern
            </label>
            <select
              value={pattern2}
              onChange={(e) => setPattern2(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {navPatterns.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-x divide-slate-200 h-[calc(100vh-120px)]">
        <div className="flex flex-col min-h-0">
          <div className="p-4 bg-slate-100 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">{patternA.label}</h3>
          </div>
          <div className="flex-1 overflow-hidden">
            <patternA.component>
              <GridBody />
            </patternA.component>
          </div>
        </div>

        <div className="flex flex-col min-h-0">
          <div className="p-4 bg-slate-100 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">{patternB.label}</h3>
          </div>
          <div className="flex-1 overflow-hidden">
            <patternB.component>
              <GridBody />
            </patternB.component>
          </div>
        </div>
      </div>
    </div>
  );
}
