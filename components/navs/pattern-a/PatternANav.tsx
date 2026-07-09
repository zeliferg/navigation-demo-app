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
  { label: "Dashboard", icon: "/nav-patterns/pattern-a/grid.svg" },
  { label: "Search", icon: "/nav-patterns/pattern-a/search-nav.svg" },
];

const propertyToolsItems = [
  { label: "Basic Information", active: true },
  { label: "Property Reports", active: false },
  { label: "Materials", active: false },
  { label: "Employee Vehicles", active: false },
  { label: "Orders", active: false },
];

const financialsItems = ["Month End Statements", "Revenue and Deduction", "Revenue Calculator"];

// Property Tools is highlighted collapsed too since its child "Basic Information" is active.
const propertyToolsGroupActive = propertyToolsItems.some((item) => item.active);

export default function PatternANav({ children }: PatternANavProps) {
  const [expanded, setExpanded] = useState(true);

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
            <div
              key={item.label}
              className={`flex items-center ${expanded ? "gap-4 px-6 py-3" : "justify-center px-4 py-3"}`}
            >
              <img src={item.icon} alt="" className="w-6 h-6 flex-shrink-0" />
              {expanded && (
                <span className="flex-1 font-semibold text-[16px] text-[#434F59] whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </div>
          ))}

          {/* Property Tools group */}
          <div className="flex flex-col gap-2">
            <div
              className={`flex items-center w-full ${expanded ? "gap-[19px]" : ""} ${
                !expanded && propertyToolsGroupActive ? "bg-[#F7FAFE]" : ""
              }`}
            >
              <img
                src={`/nav-patterns/pattern-a/indicator-${
                  !expanded && propertyToolsGroupActive ? "active" : "inactive"
                }.svg`}
                alt=""
                className={`w-[5px] h-8 flex-shrink-0 ${expanded ? "" : "invisible"}`}
              />
              <div
                className={`flex flex-1 items-center min-w-0 ${
                  expanded ? "gap-4 pr-6 py-3" : "justify-center px-4 py-3"
                }`}
              >
                <img src="/nav-patterns/pattern-a/property-tools.svg" alt="" className="w-6 h-6 flex-shrink-0" />
                {expanded && (
                  <>
                    <span className="flex-1 font-semibold text-[16px] text-[#434F59] whitespace-nowrap">
                      Property Tools
                    </span>
                    <img src="/nav-patterns/pattern-a/chevron-up.svg" alt="" className="w-6 h-6 flex-shrink-0" />
                  </>
                )}
              </div>
            </div>

            {expanded &&
              propertyToolsItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-[19px] w-full ${item.active ? "bg-[#F7FAFE]" : ""}`}
                >
                  <img
                    src={`/nav-patterns/pattern-a/indicator-${item.active ? "active" : "inactive"}.svg`}
                    alt=""
                    className="w-[5px] h-8 flex-shrink-0"
                  />
                  <div className="flex items-center gap-4 pr-6 py-3 flex-1 min-w-0">
                    <span className="w-6 h-6 flex-shrink-0" />
                    <span
                      className={`flex-1 font-semibold text-[16px] whitespace-nowrap ${
                        item.active ? "text-[#004C95]" : "text-[#434F59]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Financials group */}
          <div className="flex flex-col gap-2">
            <div className={`flex items-center w-full ${expanded ? "gap-[19px]" : ""}`}>
              <div className={`w-[5px] h-8 flex-shrink-0 ${expanded ? "" : "hidden"}`} />
              <div
                className={`flex flex-1 items-center min-w-0 ${
                  expanded ? "gap-4 pr-6 py-3" : "justify-center px-4 py-3"
                }`}
              >
                <img src="/nav-patterns/pattern-a/financials.svg" alt="" className="w-6 h-6 flex-shrink-0" />
                {expanded && (
                  <>
                    <span className="flex-1 font-semibold text-[16px] text-[#434F59] whitespace-nowrap">
                      Financials
                    </span>
                    <img src="/nav-patterns/pattern-a/chevron-up.svg" alt="" className="w-6 h-6 flex-shrink-0" />
                  </>
                )}
              </div>
            </div>

            {expanded &&
              financialsItems.map((label) => (
                <div key={label} className="flex items-center gap-4 px-6 py-3 w-full">
                  <span className="w-6 h-6 flex-shrink-0" />
                  <span className="flex-1 font-semibold text-[16px] text-[#434F59] whitespace-nowrap">{label}</span>
                </div>
              ))}
          </div>

          {/* Enforcement (collapsed group) */}
          <div className={`flex items-center w-full ${expanded ? "gap-[19px]" : ""}`}>
            <div className={`w-[5px] h-8 flex-shrink-0 ${expanded ? "" : "hidden"}`} />
            <div
              className={`flex flex-1 items-center min-w-0 ${
                expanded ? "gap-4 pr-6 py-3" : "justify-center px-4 py-3"
              }`}
            >
              <img src="/nav-patterns/pattern-a/enforcement.svg" alt="" className="w-6 h-6 flex-shrink-0" />
              {expanded && (
                <>
                  <span className="flex-1 font-semibold text-[16px] text-[#434F59] whitespace-nowrap">
                    Enforcement
                  </span>
                  <img
                    src="/nav-patterns/pattern-a/chevron-up.svg"
                    alt=""
                    className="w-6 h-6 flex-shrink-0 scale-y-[-1]"
                  />
                </>
              )}
            </div>
          </div>
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
