import PatternANav from "@/components/navs/pattern-a/PatternANav";
import PatternBNav from "@/components/navs/pattern-b/PatternBNav";
import PatternC from "@/components/navs/pattern-c/PatternC";
import PatternD from "@/components/navs/pattern-d/PatternD";

export interface NavPattern {
  id: "a" | "b" | "c" | "d";
  label: string;
  descriptor: string;
  component: React.ComponentType<{ children?: React.ReactNode }>;
}

export const navPatterns: NavPattern[] = [
  {
    id: "a",
    label: "Style A",
    descriptor: "Left sidebar with a context switcher, for managing multiple accounts.",
    component: PatternANav,
  },
  {
    id: "b",
    label: "Style B",
    descriptor: "Left sidebar with grouped categories, for dense technical monitoring.",
    component: PatternBNav,
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
