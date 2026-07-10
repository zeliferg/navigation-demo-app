"use client";

import { useState } from "react";
import { Mulish, Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });
const mulish = Mulish({ subsets: ["latin"], weight: ["400"] });

const DIR = "/nav-patterns/pattern-d";

interface PatternDNavProps {
  children?: React.ReactNode;
}

// Tab labels are the visible frame labels (the component instances default to generic
// "Item One"); these are generic UI section names, not client-identifying.
const tabs = [
  { id: "home", label: "Home" },
  { id: "dashboard", label: "Dashboard", hasChevron: true },
  { id: "knowledge-center", label: "Knowledge Center" },
  { id: "manage", label: "Manage", hasChevron: true },
  { id: "files", label: "Files" },
];

// Tab interactive states from the Figma "Nav" states section (node 70:13354):
//   Active (70:13440): no bg fill, 4px bottom border #FCCB49 (Yellow-500), white text.
//   Hover  (70:13441): bg fill token resolved to #1A3B5C — identical to the bar, i.e. an
//     invisible placeholder. Using a subtle white overlay so the hover is actually visible;
//     swap HOVER_BG for the real token if provided.
//   Default: no bg, no underline.
const HOVER_BG = "hover:bg-white/10";
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white";

// The right cluster's two items (account, help). In the pulled data both circle glyphs
// deduplicated to a single generic circle icon export, so both render with icon-circle.svg
// + a chevron — matching the pulled nav-item structure (icon-wrapper + arrow).
const rightItems = [
  { id: "account", label: "Account menu" },
  { id: "help", label: "Help menu" },
];

export default function PatternDNav({ children }: PatternDNavProps) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className={`${notoSans.className} flex flex-col h-screen w-full bg-[#FAFCFE]`}>
      {/* Top nav bar — Theme/Dark #1A3B5C, full width, 24px side padding, justify-between */}
      <header className="w-full flex items-center justify-between bg-[#1A3B5C] px-6 flex-shrink-0">
        {/* Left: logo + tabs */}
        <div className="flex items-center min-w-0">
          <span className={`${mulish.className} text-[30px] leading-[0.95] text-white pr-4 flex-shrink-0`}>Logo</span>
          <nav className="flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? "page" : undefined}
                className={`flex items-center gap-1 p-4 border-b-4 whitespace-nowrap transition-colors duration-150 ${HOVER_BG} ${FOCUS} ${
                  activeTab === tab.id ? "border-[#FCCB49]" : "border-transparent"
                }`}
              >
                <span className="text-[14px] leading-[1.5] text-white">{tab.label}</span>
                {tab.hasChevron && <img src={`${DIR}/chevron-down.svg`} alt="" className="w-2.5 h-2.5" />}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: account + help icon cluster */}
        <div className="flex items-center flex-shrink-0">
          {rightItems.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              className={`flex items-center gap-1 p-4 transition-colors duration-150 ${HOVER_BG} ${FOCUS}`}
            >
              <img src={`${DIR}/icon-circle.svg`} alt="" className="w-4 h-4" />
              <img src={`${DIR}/chevron-down.svg`} alt="" className="w-2.5 h-2.5" />
            </button>
          ))}
        </div>
      </header>

      {/* Content area */}
      <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
    </div>
  );
}
