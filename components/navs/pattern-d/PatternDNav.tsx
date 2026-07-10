"use client";

import { useEffect, useRef, useState } from "react";
import { Mulish, Noto_Sans } from "next/font/google";
import PatternDContent from "./PatternDContent";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });
const mulish = Mulish({ subsets: ["latin"], weight: ["400"] });

const DIR = "/nav-patterns/pattern-d";

// Pattern D renders its own content-area component (Figma 70:28308) rather than the shared
// GridBody — so the passed `children` (GridBody) is intentionally ignored for this pattern.
interface PatternDNavProps {
  children?: React.ReactNode;
}

interface MenuItem {
  label: string;
  external?: boolean;
}

// Dropdown-menu contents for the expandable nav items, pulled from the Figma "Nav" states
// section (node 70:13354). Labels are generic UI/section names, not client-identifying.
const menus: Record<string, MenuItem[]> = {
  dashboard: [
    { label: "Automated Findings" },
    { label: "Components" },
    { label: "Executive" },
    { label: "Manual Audits" },
  ],
  manage: [
    { label: "Projects" },
    { label: "Users" },
    { label: "Roles" },
    { label: "Integrations" },
    { label: "Files" },
  ],
  account: [{ label: "My Profile" }, { label: "Change Password" }, { label: "Sign Out" }],
  help: [
    { label: "Help Center", external: true },
    { label: "Release Notes", external: true },
    { label: "Tools & Resources", external: true },
    { label: "Ask a Question", external: true },
    { label: "Submit a Request", external: true },
  ],
};

// Tabs — Dashboard and Manage are expandable (chevron -> dropdown).
const tabs = [
  { id: "home", label: "Home" },
  { id: "dashboard", label: "Dashboard", hasMenu: true },
  { id: "knowledge-center", label: "Knowledge Center" },
  { id: "manage", label: "Manage", hasMenu: true },
  { id: "files", label: "Files" },
];

// Right cluster: account + help, both expandable (chevron -> dropdown).
const rightItems = [
  { id: "account", label: "Account menu" },
  { id: "help", label: "Help menu" },
];

// Tab interactive states from the states section (active 70:13440 / hover 70:13441):
//   Active: no bg, 4px bottom border #FCCB49; Hover: pulled fill was #1A3B5C (identical to
//   the bar, an invisible placeholder) -> using a subtle white overlay so hover is visible.
const HOVER_BG = "hover:bg-white/10";
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white";

// Dropdown styling from the pulled menus (Dashboard flyout 70:13457, profile 70:13533):
// white bg, 1px #ECEBEA border, 4px radius, overlay-shadow-medium; items px-16 py-8,
// Noto Sans 14px #333, light hover.
function DropdownMenu({
  items,
  align,
  onSelect,
}: {
  items: MenuItem[];
  align: "left" | "right";
  onSelect: () => void;
}) {
  return (
    <div
      className={`absolute top-full ${align === "left" ? "left-0" : "right-0"} mt-1 z-50 min-w-[160px] w-max bg-white border border-[#ECEBEA] rounded-[4px] py-1 shadow-[0px_3.2px_7.2px_0px_rgba(0,0,0,0.13),0px_0.6px_1.8px_0px_rgba(0,0,0,0.11)]`}
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={onSelect}
          className="flex items-center justify-between gap-6 w-full px-4 py-2 text-left text-[14px] leading-[1.5] text-[#333] whitespace-nowrap transition-colors duration-150 hover:bg-[#F7F7F7]"
        >
          <span>{item.label}</span>
          {item.external && <img src={`${DIR}/external-link.svg`} alt="" className="w-3.5 h-3.5 flex-shrink-0" />}
        </button>
      ))}
    </div>
  );
}

export default function PatternDNav({ children }: PatternDNavProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [openMenu]);

  const toggleMenu = (id: string) => setOpenMenu((prev) => (prev === id ? null : id));

  return (
    <div className={`${notoSans.className} flex flex-col h-screen w-full bg-[#FAFCFE]`}>
      {/* Top nav bar — Theme/Dark #1A3B5C, full width, 24px side padding, justify-between */}
      <header ref={navRef} className="w-full flex items-center justify-between bg-[#1A3B5C] px-6 flex-shrink-0">
        {/* Left: logo + tabs */}
        <div className="flex items-center min-w-0">
          <span className={`${mulish.className} text-[30px] leading-[0.95] text-white pr-4 flex-shrink-0`}>Logo</span>
          <nav className="flex items-center">
            {tabs.map((tab) => {
              const isOpen = openMenu === tab.id;
              return (
                <div key={tab.id} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.hasMenu) toggleMenu(tab.id);
                      else setOpenMenu(null);
                    }}
                    aria-current={activeTab === tab.id ? "page" : undefined}
                    aria-expanded={tab.hasMenu ? isOpen : undefined}
                    className={`flex items-center gap-1 p-4 border-b-4 whitespace-nowrap transition-colors duration-150 ${HOVER_BG} ${FOCUS} ${
                      activeTab === tab.id ? "border-[#FCCB49]" : "border-transparent"
                    }`}
                  >
                    <span className="text-[14px] leading-[1.5] text-white">{tab.label}</span>
                    {tab.hasMenu && (
                      <img
                        src={`${DIR}/chevron-down.svg`}
                        alt=""
                        className={`w-2.5 h-2.5 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                  {tab.hasMenu && isOpen && (
                    <DropdownMenu items={menus[tab.id]} align="left" onSelect={() => setOpenMenu(null)} />
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right: account + help icon cluster */}
        <div className="flex items-center flex-shrink-0">
          {rightItems.map((item) => {
            const isOpen = openMenu === item.id;
            return (
              <div key={item.id} className="relative">
                <button
                  type="button"
                  aria-label={item.label}
                  aria-expanded={isOpen}
                  onClick={() => toggleMenu(item.id)}
                  className={`flex items-center gap-1 p-4 transition-colors duration-150 ${HOVER_BG} ${FOCUS}`}
                >
                  <img src={`${DIR}/icon-circle.svg`} alt="" className="w-4 h-4" />
                  <img
                    src={`${DIR}/chevron-down.svg`}
                    alt=""
                    className={`w-2.5 h-2.5 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && <DropdownMenu items={menus[item.id]} align="right" onSelect={() => setOpenMenu(null)} />}
              </div>
            );
          })}
        </div>
      </header>

      {/* Content area — Pattern D-specific dashboard (not the shared GridBody). `children`
          is received (GridBody) but intentionally not rendered for this pattern. */}
      <main className="flex-1 overflow-y-auto p-6">
        <PatternDContent />
      </main>
    </div>
  );
}
