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
    descriptor: "Pattern A Navigation",
    component: PatternA,
  },
  {
    id: "b",
    label: "Style B",
    descriptor: "Pattern B Navigation",
    component: PatternB,
  },
  {
    id: "c",
    label: "Style C",
    descriptor: "Pattern C Navigation",
    component: PatternC,
  },
  {
    id: "d",
    label: "Style D",
    descriptor: "Pattern D Navigation",
    component: PatternD,
  },
];
