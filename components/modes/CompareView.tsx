import { navPatterns } from "@/lib/navPatterns";
import GridBody from "@/components/body/GridBody";

interface CompareViewProps {
  selectedPatterns: string[];
}

export default function CompareView({ selectedPatterns }: CompareViewProps) {
  const patterns = selectedPatterns
    .map((id) => navPatterns.find((p) => p.id === id))
    .filter(Boolean);

  if (patterns.length === 0) {
    return (
      <div className="p-8">
        <p className="text-slate-600">Select 2 patterns to compare</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-slate-200 bg-white">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Compare: Pattern {patterns.map((p) => p?.label).join(" vs ")}
          </h1>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {patterns.map((pattern) => {
          if (!pattern) return null;
          const Component = pattern.component;

          return (
            <div
              key={pattern.id}
              className="flex-1 flex flex-col border-r border-slate-200 last:border-r-0 overflow-y-auto"
            >
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex-shrink-0">
                <h2 className="font-semibold text-slate-900">
                  Pattern {pattern.label}
                </h2>
                <p className="text-sm text-slate-600 mt-1">{pattern.descriptor}</p>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="p-6 flex-shrink-0">
                  <Component />
                </div>
                <div className="flex-1">
                  <GridBody />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
