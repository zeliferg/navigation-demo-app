"use client";

import { ReactNode } from "react";

export type ViewMode = "overview" | "single" | "compare";

interface SwitcherRailProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  selectedPatterns: string[];
  onPatternsChange: (patterns: string[]) => void;
}

const modes = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "single", label: "Single", icon: "▭" },
  { id: "compare", label: "Compare", icon: "⊞" },
];

const patterns = ["A", "B", "C", "D"];

export default function SwitcherRail({
  currentMode,
  onModeChange,
  selectedPatterns,
  onPatternsChange,
}: SwitcherRailProps) {
  const handlePatternToggle = (pattern: string) => {
    if (currentMode === "single") {
      onPatternsChange([pattern]);
    } else if (currentMode === "compare") {
      if (selectedPatterns.includes(pattern)) {
        onPatternsChange(selectedPatterns.filter((p) => p !== pattern));
      } else if (selectedPatterns.length < 2) {
        onPatternsChange([...selectedPatterns, pattern]);
      }
    }
  };

  const isPatternDisabled = (pattern: string) => {
    if (currentMode === "overview" || currentMode !== "single" && currentMode !== "compare") {
      return true;
    }
    if (currentMode === "compare" && !selectedPatterns.includes(pattern)) {
      return selectedPatterns.length >= 2;
    }
    return false;
  };

  const showPatternGroup = currentMode === "single" || currentMode === "compare";

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-[6px] bg-white/80 rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] p-4 flex items-center gap-4"
      style={{ isolation: "isolate" }}
    >
      {/* Mode Group */}
      <div className="flex gap-4 items-center">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id as ViewMode)}
            className="flex flex-col items-center gap-1 w-12"
          >
            <div
              className="w-12 h-12 flex items-center justify-center rounded-[12px] border-[0.5px] border-solid shadow-[0px_2px_6.8px_0px_rgba(0,0,0,0.1)] transition-colors"
              style={{
                backgroundColor:
                  currentMode === mode.id ? "#212121" : "#FFFFFF",
                borderColor:
                  currentMode === mode.id ? "white" : "#D1D1D1",
              }}
            >
              <span
                className="text-2xl transition-colors"
                style={{
                  color: currentMode === mode.id ? "white" : "#212121",
                }}
              >
                {mode.icon}
              </span>
            </div>
            <span
              className="text-xs text-center font-roboto leading-none transition-colors"
              style={{
                color: "#212121",
                fontWeight: currentMode === mode.id ? 500 : 400,
                fontFamily: "Roboto, sans-serif",
              }}
            >
              {mode.label}
            </span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div
        className="w-px"
        style={{
          height: "48.5px",
          backgroundColor: "#D1D1D1",
        }}
      />

      {/* Pattern Group (only shown in Single/Compare modes) */}
      {showPatternGroup && (
        <div className="flex gap-4 items-center">
          {patterns.map((pattern) => {
            const isActive = selectedPatterns.includes(pattern);
            const isDisabled = isPatternDisabled(pattern);

            return (
              <button
                key={pattern}
                onClick={() => handlePatternToggle(pattern)}
                disabled={isDisabled}
                className="flex flex-col items-center gap-1 w-12 transition-opacity"
                style={{
                  opacity: isDisabled ? 0.4 : 1,
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-[12px] border-[0.5px] border-solid shadow-[0px_2px_6.8px_0px_rgba(0,0,0,0.1)] transition-colors font-semibold text-sm"
                  style={{
                    backgroundColor:
                      isActive ? "#212121" : "#FFFFFF",
                    borderColor:
                      isActive ? "white" : "#D1D1D1",
                    color: isActive ? "white" : "#212121",
                    pointerEvents: isDisabled ? "none" : "auto",
                  }}
                >
                  {pattern}
                </div>
                <span
                  className="text-xs text-center leading-none"
                  style={{
                    color: "#212121",
                    fontWeight: isActive ? 500 : 400,
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  {pattern}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
