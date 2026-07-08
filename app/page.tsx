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
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-[#f5f5f7] border-b border-[#e5e5ea] flex items-center px-6" style={{ height: '48px' }}>
        <div className="flex gap-1 bg-white rounded-full p-1 border border-[#e5e5ea]">
          <button
            onClick={() => setMode('overview')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              mode === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setMode('single')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              mode === 'single'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Single View
          </button>
          <button
            onClick={() => setMode('compare')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              mode === 'compare'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Compare
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {mode === 'overview' && (
          <Overview onSelectPattern={handleSelectPattern} />
        )}
        {mode === 'single' && <SingleView patternId={selectedPattern} />}
        {mode === 'compare' && <CompareView />}
      </main>
    </div>
  );
}
