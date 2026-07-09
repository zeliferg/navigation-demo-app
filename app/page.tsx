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

  const isFullBleed = currentMode === "single";

  return (
    <div className="flex h-screen bg-slate-100 overflow-x-hidden">
      <SwitcherRail
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        selectedPatterns={selectedPatterns}
        onPatternsChange={setSelectedPatterns}
      />
      <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-white pb-40">
        {isFullBleed ? (
          renderContent()
        ) : (
          <div
            className="mx-auto py-12 md:py-16"
            style={{
              paddingLeft: "clamp(1rem, 5%, 2.5rem)", // 16-40px responsive
              paddingRight: "clamp(1rem, 5%, 2.5rem)", // 16-40px responsive
              maxWidth: "1440px",
            }}
          >
            {renderContent()}
          </div>
        )}
      </main>
    </div>
  );
}
