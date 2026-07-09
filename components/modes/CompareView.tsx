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
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Compare: Pattern {patterns.map((p) => p?.label).join(" vs ")}
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {patterns.map((pattern) => {
          if (!pattern) return null;
          const Component = pattern.component;

          return (
            <div key={pattern.id} className="flex flex-col">
              <div className="mb-6">
                <h2 className="font-semibold text-slate-900 text-lg">
                  Pattern {pattern.label}
                </h2>
                <p className="text-sm text-slate-600 mt-2">{pattern.descriptor}</p>
              </div>

              <div className="mb-8 flex-shrink-0">
                <Component />
              </div>

              <div>
                <GridBody />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
