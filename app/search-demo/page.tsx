'use client';

import SearchInput from '@/components/SearchInput';

export default function SearchInputDemo() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Search Input Component
        </h1>

        <div className="bg-white p-8 rounded-lg border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Design Specs (from Figma)
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 mb-8 font-mono">
            <li>
              <strong>Background:</strong> #FFFFFF
            </li>
            <li>
              <strong>Border:</strong> 1px solid #E9ECEE
            </li>
            <li>
              <strong>Border radius:</strong> 8px
            </li>
            <li>
              <strong>Height:</strong> 37px
            </li>
            <li>
              <strong>Padding:</strong> 16px (h) × 12px (v)
            </li>
            <li>
              <strong>Icon size:</strong> 24px
            </li>
            <li>
              <strong>Icon color:</strong> #778588
            </li>
            <li>
              <strong>Text color:</strong> #778588
            </li>
            <li>
              <strong>Font:</strong> Mulish Regular, 14px
            </li>
            <li>
              <strong>Gap:</strong> 12px (icon to text)
            </li>
          </ul>

          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Component Preview
          </h2>
          <div className="max-w-md">
            <SearchInput />
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              With Custom Placeholder
            </h2>
            <div className="max-w-md">
              <SearchInput placeholder="Enter search term..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
