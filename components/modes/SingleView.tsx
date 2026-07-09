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
    <Component>
      <GridBody />
    </Component>
  );
}
