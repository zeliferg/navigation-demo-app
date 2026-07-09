import PatternA from "@/components/navs/pattern-a/PatternA";
import PatternB from "@/components/navs/pattern-b/PatternB";
import PatternC from "@/components/navs/pattern-c/PatternC";
import PatternD from "@/components/navs/pattern-d/PatternD";

export interface NavPattern {
  id: "a" | "b" | "c" | "d";
  label: string;
  descriptor: string;
  component: React.ComponentType;
}

export const navPatterns: NavPattern[] = [
  {
    id: "a",
    label: "Style A",
    descriptor: "Left sidebar with a context switcher, for managing multiple accounts.",
    component: PatternA,
  },
  {
    id: "b",
    label: "Style B",
    descriptor: "Left sidebar with grouped categories, for dense technical monitoring.",
    component: PatternB,
  },
  {
    id: "c",
    label: "Style C",
    descriptor: "Left sidebar with a light footprint, for a dashboard-first experience.",
    component: PatternC,
  },
  {
    id: "d",
    label: "Style D",
    descriptor: "Top-only nav with tabs, for flatter, filter-heavy IA.",
    component: PatternD,
  },
];
