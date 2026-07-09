"use client";

import { ReactNode } from "react";

export type ViewMode = "overview" | "single" | "compare";

interface SwitcherRailProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  selectedPatterns: string[];
  onPatternsChange: (patterns: string[]) => void;
}

export default function SwitcherRail({
  currentMode,
  onModeChange,
  selectedPatterns,
  onPatternsChange,
}: SwitcherRailProps) {
  const patterns = ["a", "b", "c", "d"];

  const handlePatternToggle = (pattern: string) => {
    if (currentMode === "single") {
      // Single select: picking one deselects others
      onPatternsChange([pattern]);
    } else if (currentMode === "compare") {
      // Multi-select capped at 2
      if (selectedPatterns.includes(pattern)) {
        onPatternsChange(selectedPatterns.filter((p) => p !== pattern));
      } else if (selectedPatterns.length < 2) {
        onPatternsChange([...selectedPatterns, pattern]);
      }
    }
  };

  const isPatternDisabled = (pattern: string) => {
    // In compare mode, disable unselected patterns when 2 are already selected
    if (currentMode === "compare" && !selectedPatterns.includes(pattern)) {
      return selectedPatterns.length >= 2;
    }
    // In overview mode, pattern selection is not relevant
    if (currentMode === "overview") {
      return true;
    }
    return false;
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-slate-200 shadow-lg flex flex-col items-center py-4 gap-6">
      {/* Mode Switcher */}
      <div className="flex flex-col gap-2 border border-slate-300 rounded-lg overflow-hidden bg-white">
        <ModeButton
          label="Overview"
          icon="◻"
          isActive={currentMode === "overview"}
          onClick={() => onModeChange("overview")}
        />
        <div className="border-b border-slate-300" />
        <ModeButton
          label="Single"
          icon="□"
          isActive={currentMode === "single"}
          onClick={() => onModeChange("single")}
        />
        <div className="border-b border-slate-300" />
        <ModeButton
          label="Compare"
          icon="⊡"
          isActive={currentMode === "compare"}
          onClick={() => onModeChange("compare")}
        />
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-slate-200" />

      {/* Pattern Switcher */}
      <div className="flex flex-col gap-2 border border-slate-300 rounded-lg overflow-hidden bg-white">
        {patterns.map((pattern, idx) => (
          <div key={pattern}>
            <PatternButton
              label={pattern.toUpperCase()}
              isActive={selectedPatterns.includes(pattern)}
              isDisabled={isPatternDisabled(pattern)}
              onClick={() => handlePatternToggle(pattern)}
            />
            {idx < patterns.length - 1 && (
              <div className="border-b border-slate-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModeButton({
  icon,
  isActive,
  onClick,
}: {
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-10 flex items-center justify-center text-lg font-semibold transition-colors ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-white text-slate-600 hover:bg-slate-50"
      }`}
      aria-label="Mode button"
    >
      {icon}
    </button>
  );
}

function PatternButton({
  label,
  isActive,
  isDisabled,
  onClick,
}: {
  label: string;
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-12 h-10 flex items-center justify-center font-semibold text-sm transition-colors ${
        isDisabled
          ? "bg-slate-50 text-slate-300 cursor-not-allowed"
          : isActive
            ? "bg-blue-500 text-white"
            : "bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}
