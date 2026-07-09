import { navPatterns } from "@/lib/navPatterns";
import GridBody from "@/components/body/GridBody";

interface SingleViewProps {
  selectedPattern: string;
}

export default function SingleView({ selectedPattern }: SingleViewProps) {
  const pattern = navPatterns.find((p) => p.id === selectedPattern);

  if (!pattern) {
    return (
      <div className="p-8">
        <p className="text-slate-600">Pattern not found</p>
      </div>
    );
  }

  const Component = pattern.component;

  return (
    <div className="flex flex-col">
      <div className="border-b border-slate-200 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Pattern {pattern.label}
        </h1>
        <p className="text-slate-600 mt-2">{pattern.descriptor}</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-64 flex-shrink-0">
          <Component />
        </div>
        <div className="flex-1">
          <GridBody />
        </div>
      </div>
    </div>
  );
}
