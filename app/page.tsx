"use client";

import { useState } from "react";
import SwitcherRail, { type ViewMode } from "@/components/shell/SwitcherRail";
import Overview from "@/components/modes/Overview";
import SingleView from "@/components/modes/SingleView";
import CompareView from "@/components/modes/CompareView";

export default function Home() {
  const [currentMode, setCurrentMode] = useState<ViewMode>("overview");
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(["a"]);

  const handleSelectPatternFromOverview = (patternId: string) => {
    setCurrentMode("single");
    setSelectedPatterns([patternId]);
  };

  const renderContent = () => {
    switch (currentMode) {
      case "overview":
        return <Overview onSelectPattern={handleSelectPatternFromOverview} />;
      case "single":
        return <SingleView selectedPattern={selectedPatterns[0] || "a"} />;
      case "compare":
        return <CompareView selectedPatterns={selectedPatterns} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <SwitcherRail
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        selectedPatterns={selectedPatterns}
        onPatternsChange={setSelectedPatterns}
      />
      <main className="flex-1 overflow-y-auto bg-white pb-40">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-16 md:py-16">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
