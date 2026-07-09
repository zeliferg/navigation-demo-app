"use client";

import GridOnIcon from "@mui/icons-material/GridOn";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CompareIcon from "@mui/icons-material/Compare";
import { navPatterns } from "@/lib/navPatterns";

export type ViewMode = "overview" | "single" | "compare";

interface SwitcherRailProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  selectedPatterns: string[];
  onPatternsChange: (patterns: string[]) => void;
}

const modes = [
  { id: "overview", label: "Overview", Icon: GridOnIcon },
  { id: "single", label: "Single", Icon: CheckBoxOutlineBlankIcon },
  { id: "compare", label: "Compare", Icon: CompareIcon },
];

export default function SwitcherRail({
  currentMode,
  onModeChange,
  selectedPatterns,
  onPatternsChange,
}: SwitcherRailProps) {
  const handlePatternToggle = (patternId: string) => {
    if (currentMode === "single") {
      onPatternsChange([patternId]);
    } else if (currentMode === "compare") {
      if (selectedPatterns.includes(patternId)) {
        onPatternsChange(selectedPatterns.filter((p) => p !== patternId));
      } else if (selectedPatterns.length < 2) {
        onPatternsChange([...selectedPatterns, patternId]);
      }
    }
  };

  const isPatternDisabled = (patternId: string) => {
    if (currentMode === "overview") {
      return true;
    }
    if (currentMode === "single") {
      return false;
    }
    if (currentMode === "compare") {
      if (selectedPatterns.includes(patternId)) {
        return false;
      }
      return selectedPatterns.length >= 2;
    }
    return false;
  };

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-[6px] bg-white/80 rounded-[16px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] flex items-center"
      style={{
        isolation: "isolate",
        padding: "16px",
        gap: "16px",
      }}
    >
      {/* Mode Group */}
      <div className="flex items-center" style={{ gap: "16px" }}>
        {modes.map((mode) => {
          const Icon = mode.Icon;
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id as ViewMode)}
              className="flex flex-col items-center w-12"
              style={{ gap: "4px" }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-[12px] border-[0.5px] border-solid shadow-[0px_2px_6.8px_0px_rgba(0,0,0,0.1)] transition-colors"
                style={{
                  backgroundColor: isActive ? "#212121" : "#FFFFFF",
                  borderColor: isActive ? "white" : "#D1D1D1",
                }}
              >
                <Icon
                  sx={{
                    fontSize: 24,
                    color: isActive ? "white" : "#212121",
                    transition: "color 0.2s",
                  }}
                />
              </div>
              <span
                className="text-xs text-center leading-none transition-colors"
                style={{
                  color: "#212121",
                  fontWeight: isActive ? 500 : 400,
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                {mode.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div
        className="h-12"
        style={{
          width: "1px",
          backgroundColor: "#D1D1D1",
          marginBottom: "4px",
        }}
      />

      {/* Pattern Group (always shown) */}
      <div className="flex items-center" style={{ gap: "16px" }}>
        {navPatterns.map((pattern) => {
          const isActive = selectedPatterns.includes(pattern.id);
          const isDisabled = isPatternDisabled(pattern.id);

          return (
            <button
              key={pattern.id}
              onClick={() => handlePatternToggle(pattern.id)}
              disabled={isDisabled}
              className="flex flex-col items-center w-12 transition-opacity"
              style={{
                gap: "4px",
                opacity: isDisabled ? 0.4 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-[12px] border-[0.5px] border-solid shadow-[0px_2px_6.8px_0px_rgba(0,0,0,0.1)] transition-colors font-semibold text-sm"
                style={{
                  backgroundColor: isActive ? "#212121" : "#FFFFFF",
                  borderColor: isActive ? "white" : "#D1D1D1",
                  color: isActive ? "white" : "#212121",
                  pointerEvents: isDisabled ? "none" : "auto",
                }}
              >
                {pattern.label}
              </div>
              <span
                className="text-xs text-center leading-none"
                style={{
                  color: "#212121",
                  fontWeight: isActive ? 500 : 400,
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                {pattern.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
