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
    <div className="flex flex-col gap-8 lg:flex-row h-screen">
      <div className="w-full lg:w-64 flex-shrink-0 overflow-y-auto">
        <Component />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <GridBody />
        </div>
      </div>
    </div>
  );
}
