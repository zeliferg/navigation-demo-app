import { navPatterns } from "@/lib/navPatterns";

export default function Overview() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Navigation Patterns</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {navPatterns.map((pattern) => {
          const Component = pattern.component;
          return (
            <div
              key={pattern.id}
              className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Pattern {pattern.label}
                </h2>
                <p className="text-sm text-slate-600 mt-1">{pattern.descriptor}</p>
              </div>
              <div className="p-6">
                <Component />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
