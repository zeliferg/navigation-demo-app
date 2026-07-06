'use client';

import { useState } from 'react';
import Overview from '@/components/modes/Overview';
import SingleView from '@/components/modes/SingleView';
import CompareView from '@/components/modes/CompareView';

type Mode = 'overview' | 'single' | 'compare';

export default function Home() {
  const [mode, setMode] = useState<Mode>('overview');
  const [selectedPattern, setSelectedPattern] = useState('pattern-a');

  const handleSelectPattern = (patternId: string) => {
    setSelectedPattern(patternId);
    setMode('single');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-slate-900">
              Navigation Demo
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setMode('single')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'single'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Single View
            </button>
            <button
              onClick={() => setMode('compare')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'compare'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Compare
            </button>
          </div>
        </div>
      </header>

      <main>
        {mode === 'overview' && (
          <Overview onSelectPattern={handleSelectPattern} />
        )}
        {mode === 'single' && <SingleView patternId={selectedPattern} />}
        {mode === 'compare' && <CompareView />}
      </main>
    </div>
  );
}
