"use client";

import { useState } from "react";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface PatternANavProps {
  children?: React.ReactNode;
}

const primaryMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: "/nav-patterns/pattern-a/grid.svg" },
  { id: "search", label: "Search", icon: "/nav-patterns/pattern-a/search-nav.svg" },
];

const propertyToolsItems = [
  { id: "basic-information", label: "Basic Information" },
  { id: "property-reports", label: "Property Reports" },
  { id: "materials", label: "Materials" },
  { id: "employee-vehicles", label: "Employee Vehicles" },
  { id: "orders", label: "Orders" },
];

const financialsItems = [
  { id: "month-end-statements", label: "Month End Statements" },
  { id: "revenue-deduction", label: "Revenue and Deduction" },
  { id: "revenue-calculator", label: "Revenue Calculator" },
];

const DEFAULT_ACTIVE_ID = "basic-information";

// State values read directly from the Figma "Nav item states" node (47:5163):
// Inactive: no bg, text #434F59. Hover: bg #ECF5FF, text unchanged.
// Active (level 1 & 2): bg #F7FAFE, text #004C95, 5px bar (self-stretch), bar color #1A7BD9.
// Icon graphic/color and font-weight (600) never change between states.
const HOVER_BG = "hover:bg-[#ECF5FF]";
const TRANSITION = "transition-colors duration-150";
const ACTIVE_TEXT = "text-[#004C95]";
const INACTIVE_TEXT = "text-[#434F59]";

function NavRow({
  icon,
  label,
  active,
  expanded,
  onClick,
  isGroup = false,
  isOpen = true,
}: {
  icon: string;
  label: string;
  active: boolean;
  expanded: boolean;
  onClick?: () => void;
  isGroup?: boolean;
  isOpen?: boolean;
}) {
  const showBar = expanded || active;

  return (
    <div
      onClick={onClick}
      className={`group flex items-center w-full ${TRANSITION} ${onClick ? "cursor-pointer" : ""} ${
        showBar ? (expanded ? "gap-[19px]" : "gap-[11px]") : ""
      } ${active ? "bg-[#F7FAFE]" : HOVER_BG}`}
    >
      {showBar && (
        <div className={`w-[5px] self-stretch flex-shrink-0 ${active ? "bg-[#1A7BD9]" : ""}`} />
      )}
      <div
        className={`flex flex-1 items-center min-w-0 ${
          expanded ? "gap-4 pr-6 py-3" : "justify-center px-4 py-3"
        }`}
      >
        <img src={icon} alt="" className="w-6 h-6 flex-shrink-0" />
        {expanded && (
          <>
            <span className={`flex-1 font-semibold text-[16px] whitespace-nowrap ${TRANSITION} ${active ? ACTIVE_TEXT : INACTIVE_TEXT}`}>
              {label}
            </span>
            {isGroup && (
              <div className="relative w-6 h-6 flex-shrink-0">
                <img
                  src={`/nav-patterns/pattern-a/${isOpen ? "chevron-up" : "chevron-down"}.svg`}
                  alt=""
                  className="absolute inset-0 w-6 h-6 transition-opacity duration-150 group-hover:opacity-0"
                />
                <img
                  src="/nav-patterns/pattern-a/chevron-down.svg"
                  alt=""
                  className="absolute inset-0 w-6 h-6 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function NavSubRow({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-[19px] w-full cursor-pointer ${TRANSITION} ${
        active ? "bg-[#F7FAFE]" : HOVER_BG
      }`}
    >
      <div className={`w-[5px] self-stretch flex-shrink-0 ${active ? "bg-[#1A7BD9]" : ""}`} />
      <div className="flex items-center gap-4 pr-6 py-3 flex-1 min-w-0">
        <span className="w-6 h-6 flex-shrink-0" />
        <span className={`flex-1 font-semibold text-[16px] whitespace-nowrap ${TRANSITION} ${active ? ACTIVE_TEXT : INACTIVE_TEXT}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default function PatternANav({ children }: PatternANavProps) {
  const [expanded, setExpanded] = useState(true);
  const [activeId, setActiveId] = useState(DEFAULT_ACTIVE_ID);

  const propertyToolsHasActiveChild = propertyToolsItems.some((item) => item.id === activeId);
  const financialsHasActiveChild = financialsItems.some((item) => item.id === activeId);

  return (
    <div className={`${mulish.className} flex h-screen w-full bg-[#F8FAFB] border border-[#E9ECEE]`}>
      {/* Sidebar */}
      <aside
        className={`${
          expanded ? "w-[296px]" : "w-[56px]"
        } transition-[width] duration-200 ease-in-out flex-shrink-0 bg-white border-r border-[#E9ECEE] shadow-[0px_0px_20px_0px_rgba(94,98,120,0.04)] flex flex-col py-[14px] overflow-x-hidden overflow-y-auto`}
      >
        {/* Logo */}
        <div className={`flex items-center h-14 ${expanded ? "justify-between px-6" : "justify-center px-4"}`}>
          {expanded && (
            <div className="text-[#45A3FF] text-[22px] leading-[0.95] whitespace-nowrap">
              <p>Placeholder</p>
              <p>Logo</p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            className="flex-shrink-0"
          >
            <img
              src={`/nav-patterns/pattern-a/${expanded ? "compress" : "expand"}.svg`}
              alt=""
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Context Switcher */}
        {expanded ? (
          <div className="px-[13px] mb-2">
            <div className="flex items-center gap-4 bg-[#FCFCFC] border border-[#C7CFCE] rounded-lg px-[11px] py-3">
              <img src="/nav-patterns/pattern-a/vector-pin.svg" alt="" className="w-[19px] h-[25px] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[16px] text-[#434F59] leading-normal whitespace-nowrap">
                  Community Switcher
                </p>
                <p className="font-normal text-[14px] text-[#5D6A71] leading-normal whitespace-nowrap">Denver, CO</p>
              </div>
              <img src="/nav-patterns/pattern-a/sort.svg" alt="" className="w-4 h-4 flex-shrink-0" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center h-12">
              <img src="/nav-patterns/pattern-a/vector-pin.svg" alt="" className="w-[19px] h-[25px]" />
            </div>
            <div className="h-px w-full bg-[#E9ECEE] mb-2" />
          </>
        )}

        {/* Menu */}
        <nav className="flex flex-col gap-4 mt-4">
          {primaryMenuItems.map((item) => (
            <NavRow
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={item.id === activeId}
              expanded={expanded}
              onClick={() => setActiveId(item.id)}
            />
          ))}

          {/* Property Tools group */}
          <div className="flex flex-col gap-2">
            <NavRow
              icon="/nav-patterns/pattern-a/property-tools.svg"
              label="Property Tools"
              active={!expanded && propertyToolsHasActiveChild}
              expanded={expanded}
              isGroup
              isOpen
            />

            {expanded &&
              propertyToolsItems.map((item) => (
                <NavSubRow
                  key={item.id}
                  label={item.label}
                  active={item.id === activeId}
                  onClick={() => setActiveId(item.id)}
                />
              ))}
          </div>

          {/* Financials group */}
          <div className="flex flex-col gap-2">
            <NavRow
              icon="/nav-patterns/pattern-a/financials.svg"
              label="Financials"
              active={!expanded && financialsHasActiveChild}
              expanded={expanded}
              isGroup
              isOpen
            />

            {expanded &&
              financialsItems.map((item) => (
                <NavSubRow
                  key={item.id}
                  label={item.label}
                  active={item.id === activeId}
                  onClick={() => setActiveId(item.id)}
                />
              ))}
          </div>

          {/* Enforcement (closed group, no children shown) */}
          <NavRow
            icon="/nav-patterns/pattern-a/enforcement.svg"
            label="Enforcement"
            active={false}
            expanded={expanded}
            isGroup
            isOpen={false}
          />
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-white shadow-[0px_1px_0px_0px_#E7EAE8] flex items-center gap-6 pl-10 pr-6 flex-shrink-0">
          <div className="flex-1 min-w-0 border border-[#E9ECEE] rounded-lg bg-white px-4 py-3 flex items-center gap-3">
            <img src="/nav-patterns/pattern-a/search.svg" alt="" className="w-6 h-6 flex-shrink-0" />
            <span className="text-[14px] font-normal text-[#778588] truncate">
              Search by Name, Plate, Year, Make, Model, or Color
            </span>
          </div>
          <div className="flex items-center flex-shrink-0">
            <div className="p-4 flex items-center justify-center">
              <img src="/nav-patterns/pattern-a/flag.png" alt="" className="w-6 h-3 object-cover" />
            </div>
            <div className="p-4">
              <img src="/nav-patterns/pattern-a/help-circle.svg" alt="" className="w-6 h-6" />
            </div>
            <div className="p-4">
              <img src="/nav-patterns/pattern-a/bell.svg" alt="" className="w-6 h-6" />
            </div>
            <div className="p-4">
              <img src="/nav-patterns/pattern-a/user.svg" alt="" className="w-6 h-6" />
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto px-10 py-10">{children}</main>
      </div>
    </div>
  );
}
