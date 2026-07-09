import { navPatterns } from "@/lib/navPatterns";

interface OverviewProps {
  onSelectPattern: (patternId: string) => void;
}

export default function Overview({ onSelectPattern }: OverviewProps) {
  const handleCardClick = (patternId: string) => {
    onSelectPattern(patternId);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-12">Navigation Patterns</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {navPatterns.map((pattern) => {
          const Component = pattern.component;
          return (
            <button
              key={pattern.id}
              onClick={() => handleCardClick(pattern.id)}
              className="group rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow text-left cursor-pointer"
            >
              {/* Thumbnail container with pattern component */}
              <div className="bg-slate-50 border-b border-slate-200 p-4 h-48 overflow-hidden flex items-center justify-center">
                <div className="scale-50 origin-center">
                  <Component />
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Pattern {pattern.label.split(" ")[1]}
                </h2>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {pattern.descriptor}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
