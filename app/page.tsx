"use client";

import { useState } from "react";
import SwitcherRail, { type ViewMode } from "@/components/shell/SwitcherRail";
import Overview from "@/components/modes/Overview";
import SingleView from "@/components/modes/SingleView";
import CompareView from "@/components/modes/CompareView";

export default function Home() {
  const [currentMode, setCurrentMode] = useState<ViewMode>("overview");
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(["a"]);

  const renderContent = () => {
    switch (currentMode) {
      case "overview":
        return <Overview />;
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
      <main className="flex-1 overflow-y-auto bg-white pb-32">
        {renderContent()}
      </main>
    </div>
  );
}
