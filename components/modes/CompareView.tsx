import { navPatterns } from "@/lib/navPatterns";
import GridBody from "@/components/body/GridBody";

interface CompareViewProps {
  selectedPatterns: string[];
}

export default function CompareView({ selectedPatterns }: CompareViewProps) {
  const patterns = selectedPatterns
    .map((id) => navPatterns.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 2);

  if (patterns.length === 0) {
    return (
      <div className="p-8">
        <p className="text-slate-600">Select 2 patterns to compare</p>
      </div>
    );
  }

  // Full-bleed: the two shells split the available width evenly (flex-1 each), so with two
  // patterns each occupies half the viewport (minus the switcher rail) at full height. Each
  // pattern renders its own full app shell; GridBody is passed for patterns that use it.
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {patterns.map((pattern) => {
        if (!pattern) return null;
        const Component = pattern.component;

        return (
          <div
            key={pattern.id}
            className="relative flex-1 min-w-0 h-screen overflow-hidden border-r border-slate-200 last:border-r-0"
          >
            <span className="pointer-events-none absolute bottom-3 left-3 z-50 rounded-md bg-slate-900/80 px-2 py-1 text-xs font-semibold text-white">
              Pattern {pattern.label}
            </span>
            <Component>
              <GridBody />
            </Component>
          </div>
        );
      })}
    </div>
  );
}
