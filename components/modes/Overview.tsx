import { navPatterns } from "@/lib/navPatterns";

interface OverviewProps {
  onSelectPattern: (patternId: string) => void;
}

export default function Overview({ onSelectPattern }: OverviewProps) {
  const handleCardClick = (patternId: string) => {
    onSelectPattern(patternId);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-12">Navigation Patterns</h1>

      {/* Desktop: 12-column grid (40px margin, 24px gutter) */}
      <div
        className="hidden lg:grid gap-6 mb-8"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "24px",
        }}
      >
        {navPatterns.map((pattern) => {
          const Component = pattern.component;
          return (
            <button
              key={pattern.id}
              onClick={() => handleCardClick(pattern.id)}
              className="group rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow text-left cursor-pointer"
              style={{
                gridColumn: "span 5",
              }}
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

      {/* Tablet: 8-column grid (24px margin, 16px gutter) */}
      <div
        className="hidden md:grid lg:hidden gap-4 mb-8"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: "16px",
        }}
      >
        {navPatterns.map((pattern) => {
          const Component = pattern.component;
          return (
            <button
              key={pattern.id}
              onClick={() => handleCardClick(pattern.id)}
              className="group rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow text-left cursor-pointer"
              style={{
                gridColumn: "span 3", // 3 out of 8 columns = roughly half
              }}
            >
              {/* Thumbnail container with pattern component */}
              <div className="bg-slate-50 border-b border-slate-200 p-4 h-40 overflow-hidden flex items-center justify-center">
                <div className="scale-50 origin-center">
                  <Component />
                </div>
              </div>

              {/* Card content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Pattern {pattern.label.split(" ")[1]}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pattern.descriptor}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile: 2-column grid (16px margin, 16px gutter, stacked 2x2) */}
      <div
        className="grid md:hidden gap-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        {navPatterns.map((pattern) => {
          const Component = pattern.component;
          return (
            <button
              key={pattern.id}
              onClick={() => handleCardClick(pattern.id)}
              className="group rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow text-left cursor-pointer"
              style={{
                gridColumn: "span 1",
              }}
            >
              {/* Thumbnail container with pattern component */}
              <div className="bg-slate-50 border-b border-slate-200 p-3 h-32 overflow-hidden flex items-center justify-center">
                <div className="scale-50 origin-center">
                  <Component />
                </div>
              </div>

              {/* Card content */}
              <div className="p-3">
                <h2 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Pattern {pattern.label.split(" ")[1]}
                </h2>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
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
