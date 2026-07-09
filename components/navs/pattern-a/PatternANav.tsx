"use client";

import { useEffect, useRef, useState } from "react";
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

const languages = [
  { code: "de", label: "Deutsch", flag: "/nav-patterns/pattern-a/flag-deutsch.png" },
  { code: "nl", label: "Dutch", flag: "/nav-patterns/pattern-a/flag-dutch.png" },
  { code: "en", label: "English", flag: "/nav-patterns/pattern-a/flag.png" },
  { code: "en-uk", label: "English (UK)", flag: "/nav-patterns/pattern-a/flag-en-uk.png" },
  { code: "es-mx", label: "Español (México)", flag: "/nav-patterns/pattern-a/flag-es-mx.png" },
  { code: "es", label: "Español (Spanish)", flag: "/nav-patterns/pattern-a/flag-es.png" },
  { code: "fr", label: "Français", flag: "/nav-patterns/pattern-a/flag-fr.png" },
  { code: "it", label: "Italiano", flag: "/nav-patterns/pattern-a/flag-it.png" },
  { code: "pt-br", label: "Português (Brazil)", flag: "/nav-patterns/pattern-a/flag-pt-br.png" },
  { code: "ru", label: "Русский", flag: "/nav-patterns/pattern-a/flag-ru.png" },
  { code: "vi", label: "Tiếng Việt", flag: "/nav-patterns/pattern-a/flag-vi.png" },
  { code: "tr", label: "Türkçe", flag: "/nav-patterns/pattern-a/flag-tr.png" },
  { code: "ar", label: "العربية", flag: "/nav-patterns/pattern-a/flag-ar.png", rtl: true },
  { code: "th", label: "ภาษาไทย", flag: "/nav-patterns/pattern-a/flag-th.png" },
  { code: "zh", label: "简体中文", flag: "/nav-patterns/pattern-a/flag-zh.png" },
];

const accountMenuItems = ["General Settings", "Communications", "Login Attempts"];

const notifications = [
  { id: 1, message: "Your data is prepared, click here to download.", time: "8 seconds ago", unread: true },
  { id: 2, message: "Your data is prepared, click here to download.", time: "12 days ago", unread: false },
  { id: 3, message: "Your data is prepared, click here to download.", time: "25 days ago", unread: false },
];

type DropdownKey = "language" | "help" | "notifications" | "account";

// Anonymized placeholders — pulled data had real-looking property names/addresses.
const properties = [
  { id: "property-1", name: "Property 1", city: "Denver, CO" },
  { id: "property-2", name: "Property 2", city: "Westminster, CO" },
  { id: "property-3", name: "Property 3", city: "Boulder, CO" },
  { id: "property-4", name: "Property 4", city: "San Diego, CA" },
  { id: "property-5", name: "Property 5", city: "Houston, TX" },
  { id: "property-6", name: "Property 6", city: "Orlando, FL" },
  { id: "property-7", name: "Property 7", city: "Orlando, FL" },
];

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
        <div className={`w-[5px] flex-shrink-0 ${active ? "self-stretch bg-[#1A7BD9]" : "h-8"}`} />
      )}
      <div
        className={`flex flex-1 items-center h-12 min-w-0 ${
          expanded ? "gap-4 pr-6" : "justify-center px-4"
        }`}
      >
        <img src={icon} alt="" className="w-6 h-6 flex-shrink-0" />
        {expanded && (
          <>
            <span className={`flex-1 font-semibold text-[16px] leading-[1.2] whitespace-nowrap ${TRANSITION} ${active ? ACTIVE_TEXT : INACTIVE_TEXT}`}>
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
      <div className={`w-[5px] flex-shrink-0 ${active ? "self-stretch bg-[#1A7BD9]" : "h-8"}`} />
      <div className="flex items-center gap-4 pr-6 h-12 flex-1 min-w-0">
        <span className="w-6 h-6 flex-shrink-0" />
        <span className={`flex-1 font-semibold text-[16px] leading-[1.2] whitespace-nowrap ${TRANSITION} ${active ? ACTIVE_TEXT : INACTIVE_TEXT}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

// Popover shadows read from the pulled data: language/help use the larger
// "0px 8px 10px" blur, account/notifications use the tighter "0px 3px 10px".
const POPOVER_LARGE_SHADOW = "shadow-[0px_8px_10px_0px_rgba(0,0,0,0.1)]";
const POPOVER_SMALL_SHADOW = "shadow-[0px_3px_10px_0px_rgba(0,0,0,0.1)]";
const POPOVER_BASE = "absolute right-0 top-full mt-2 bg-white border border-[#E9ECEE] rounded-lg z-50";

export default function PatternANav({ children }: PatternANavProps) {
  const [expanded, setExpanded] = useState(true);
  const [activeId, setActiveId] = useState(DEFAULT_ACTIVE_ID);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const topBarIconsRef = useRef<HTMLDivElement>(null);

  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [switcherSearch, setSwitcherSearch] = useState("");
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>(["property-1"]);
  const switcherRef = useRef<HTMLDivElement>(null);

  const filteredProperties = properties.filter((p) => {
    const q = switcherSearch.trim().toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
  });
  const allFilteredSelected =
    filteredProperties.length > 0 && filteredProperties.every((p) => selectedPropertyIds.includes(p.id));
  const selectedProperties = properties.filter((p) => selectedPropertyIds.includes(p.id));

  const togglePropertySelection = (id: string) => {
    setSelectedPropertyIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      const filteredIds = new Set(filteredProperties.map((p) => p.id));
      setSelectedPropertyIds((prev) => prev.filter((id) => !filteredIds.has(id)));
    } else {
      setSelectedPropertyIds((prev) => Array.from(new Set([...prev, ...filteredProperties.map((p) => p.id)])));
    }
  };

  const propertyToolsHasActiveChild = propertyToolsItems.some((item) => item.id === activeId);
  const financialsHasActiveChild = financialsItems.some((item) => item.id === activeId);

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    if (!openDropdown) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (topBarIconsRef.current && !topBarIconsRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [openDropdown]);

  useEffect(() => {
    if (!switcherOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setSwitcherOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [switcherOpen]);

  return (
    <div className={`${mulish.className} flex h-screen w-full bg-[#F8FAFB] border border-[#E9ECEE]`}>
      {/* Sidebar */}
      <aside
        className={`w-full ${
          expanded ? "max-w-[296px]" : "max-w-[56px]"
        } transition-[max-width] duration-200 ease-in-out bg-white border-r border-[#E9ECEE] shadow-[0px_0px_20px_0px_rgba(94,98,120,0.04)] flex flex-col gap-6 py-[14px] overflow-visible`}
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

        {/* Context Switcher / Property Switcher trigger */}
        <div ref={switcherRef} className="relative">
          {expanded ? (
            <div className="px-[13px]">
              <button
                type="button"
                onClick={() => setSwitcherOpen((prev) => !prev)}
                className="flex items-center gap-4 bg-[#FCFCFC] border border-[#C7CFCE] rounded-lg px-[11px] h-[62px] w-full text-left"
              >
                <img src="/nav-patterns/pattern-a/vector-pin.svg" alt="" className="w-[19px] h-[25px] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  {selectedProperties.length <= 1 ? (
                    <>
                      <p className="font-bold text-[16px] text-[#434F59] leading-normal truncate">
                        {selectedProperties[0]?.name ?? "Community Switcher"}
                      </p>
                      <p className="font-normal text-[14px] text-[#5D6A71] leading-normal truncate">
                        {selectedProperties[0]?.city ?? "Select a community"}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[16px] text-[#434F59] leading-normal truncate">
                        <span className="font-bold">{selectedProperties.length}</span>{" "}
                        <span className="font-normal">Communities Selected</span>
                      </p>
                      <p className="font-normal text-[14px] text-[#5D6A71] leading-normal truncate">
                        {selectedProperties.map((p) => p.name).join(", ")}
                      </p>
                    </>
                  )}
                </div>
                <img src="/nav-patterns/pattern-a/sort.svg" alt="" className="w-4 h-4 flex-shrink-0" />
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setSwitcherOpen((prev) => !prev)}
                className="flex items-center justify-center h-12 w-full"
                aria-label="Switch community"
              >
                <img src="/nav-patterns/pattern-a/vector-pin.svg" alt="" className="w-[19px] h-[25px]" />
              </button>
              <div className="h-px w-full bg-[#E9ECEE]" />
            </>
          )}

          {switcherOpen && (
            <div
              className={`absolute ${
                expanded ? "left-[13px]" : "left-2"
              } w-[min(436px,calc(100vw-2rem))] top-full mt-1 z-50 bg-white border border-[#E9ECEE] rounded-lg shadow-[0px_3px_20px_-2px_rgba(0,0,0,0.1)] p-4 flex flex-col gap-4`}
            >
              {/* Search */}
              <div className="flex items-center justify-between gap-2 border border-[#1A7BD9] rounded-lg px-[14px] py-[7px]">
                <input
                  type="text"
                  value={switcherSearch}
                  onChange={(e) => setSwitcherSearch(e.target.value)}
                  placeholder="Search Name or City"
                  className="flex-1 min-w-0 text-[14px] text-[#202227] placeholder:text-[#202227] outline-none"
                />
                <img src="/nav-patterns/pattern-a/search.svg" alt="" className="w-6 h-6 flex-shrink-0" />
              </div>

              {/* Select State (static, non-functional per scope) */}
              <div className="flex items-center justify-between gap-2 border border-[#C7CFCE] rounded-lg px-[14px] py-[7px]">
                <span className="text-[14px] text-[#202227]">Select State</span>
                <img src="/nav-patterns/pattern-a/chevron-down.svg" alt="" className="w-6 h-6 flex-shrink-0" />
              </div>

              {/* Select All */}
              <button type="button" onClick={toggleSelectAll} className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-[6px] border flex items-center justify-center flex-shrink-0 ${
                    allFilteredSelected ? "bg-[#1A7BD9] border-[#1A7BD9]" : "border-[#C7CFCE]"
                  }`}
                >
                  {allFilteredSelected && (
                    <img src="/nav-patterns/pattern-a/check.svg" alt="" className="w-3 h-3" />
                  )}
                </span>
                <span className="text-[14px] text-[#202227]">Select All ({filteredProperties.length})</span>
              </button>

              <div className="h-px w-full bg-[#E9ECEE]" />

              {/* Property list */}
              <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto">
                {filteredProperties.map((property) => {
                  const isSelected = selectedPropertyIds.includes(property.id);
                  return (
                    <button
                      key={property.id}
                      type="button"
                      onClick={() => togglePropertySelection(property.id)}
                      className={`flex items-start gap-3 p-4 rounded-lg border text-left ${TRANSITION} ${
                        isSelected ? "bg-[#ECF5FF] border-[#1A7BD9]" : "border-[#C7CFCE]"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-[6px] border flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "bg-[#1A7BD9] border-[#1A7BD9]" : "border-[#C7CFCE]"
                        }`}
                      >
                        {isSelected && <img src="/nav-patterns/pattern-a/check.svg" alt="" className="w-3 h-3" />}
                      </span>
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-[14px] text-[#202227] truncate">{property.name}</span>
                        <span className="text-[12px] text-[#202227] truncate">{property.city}</span>
                      </div>
                    </button>
                  );
                })}
                {filteredProperties.length === 0 && (
                  <p className="text-[14px] text-[#5D6A71] py-2">No communities match your search.</p>
                )}
              </div>

              {/* Choose Community */}
              <button
                type="button"
                disabled={selectedPropertyIds.length === 0}
                onClick={() => setSwitcherOpen(false)}
                className={`w-full rounded-lg py-3 text-[16px] text-center font-bold text-white tracking-[0.16px] ${TRANSITION} ${
                  selectedPropertyIds.length === 0 ? "bg-[#ACB8B8] cursor-not-allowed" : "bg-[#1A7BD9]"
                }`}
              >
                Choose Community
              </button>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-4 flex-1 overflow-y-auto overflow-x-visible">
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
        <header className="h-14 bg-white shadow-[0px_1px_0px_0px_#E7EAE8] flex items-center justify-between px-6 flex-shrink-0">
          <div className="w-full max-w-[478px] min-w-0 border border-[#E9ECEE] rounded-lg bg-white px-4 py-3 flex items-center gap-3">
            <img src="/nav-patterns/pattern-a/search.svg" alt="" className="w-6 h-6 flex-shrink-0" />
            <span className="text-[14px] font-normal text-[#778588] truncate">
              Search by Name, Plate, Year, Make, Model, or Color
            </span>
          </div>
          <div ref={topBarIconsRef} className="flex items-center flex-shrink-0">
            {/* Language selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("language")}
                className="relative flex items-center justify-center w-14 h-14"
                aria-label="Select language"
              >
                <span
                  className={`absolute inset-0 m-auto w-8 h-8 rounded-[6px] ${TRANSITION} ${
                    openDropdown === "language" ? "bg-[#ECF5FF]" : ""
                  }`}
                />
                <img
                  src={languages.find((l) => l.code === selectedLanguage)?.flag}
                  alt=""
                  className="relative z-10 w-6 h-3 object-cover"
                />
              </button>
              {openDropdown === "language" && (
                <div className={`${POPOVER_BASE} ${POPOVER_LARGE_SHADOW} w-[min(218px,calc(100vw-2rem))] p-6 flex flex-col gap-4`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      dir={lang.rtl ? "rtl" : undefined}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setOpenDropdown(null);
                      }}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <img src={lang.flag} alt="" className="w-[30px] h-4 object-cover flex-shrink-0" />
                      <span className="flex-1 px-4 text-[14px] font-normal text-[#5D6A71]">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Help */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("help")}
                className="relative flex items-center justify-center w-14 h-14"
                aria-label="Help"
              >
                <span
                  className={`absolute inset-0 m-auto w-8 h-8 rounded-[6px] ${TRANSITION} ${
                    openDropdown === "help" ? "bg-[#1A7BD9]" : ""
                  }`}
                />
                <img
                  src={`/nav-patterns/pattern-a/${openDropdown === "help" ? "help-circle-white" : "help-circle"}.svg`}
                  alt=""
                  className="relative z-10 w-6 h-6"
                />
              </button>
              {openDropdown === "help" && (
                <div className={`${POPOVER_BASE} ${POPOVER_LARGE_SHADOW} w-[min(329px,calc(100vw-2rem))] py-8 flex flex-col gap-6`}>
                  <div className="flex flex-col">
                    <div className="flex items-start gap-[10px] px-8 w-full">
                      <p className="flex-1 font-bold text-[22px] leading-[1.2] text-[#2A3440]">Need any help?</p>
                      <button type="button" onClick={() => setOpenDropdown(null)} aria-label="Close">
                        <img src="/nav-patterns/pattern-a/close-x.svg" alt="" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  <div className="h-px w-full bg-[#E9ECEE]" />
                  <div className="px-8">
                    <p className="text-[14px] leading-[1.2] text-[#202227]">
                      Contact us at{" "}
                      <span className="font-bold text-[#1A7BD9]">support@example.com</span> for assistance and
                      we&rsquo;ll be happy to help you!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("notifications")}
                className="relative flex items-center justify-center w-14 h-14"
                aria-label="Notifications"
              >
                <span
                  className={`absolute inset-0 m-auto w-8 h-8 rounded-[6px] ${TRANSITION} ${
                    openDropdown === "notifications" ? "bg-[#1A7BD9]" : ""
                  }`}
                />
                <img
                  src={`/nav-patterns/pattern-a/${
                    openDropdown === "notifications" ? "bell-badge-white" : "bell"
                  }.svg`}
                  alt=""
                  className="relative z-10 w-6 h-6"
                />
              </button>
              {openDropdown === "notifications" && (
                <div className={`${POPOVER_BASE} ${POPOVER_SMALL_SHADOW} w-[min(290px,calc(100vw-2rem))] pt-4 pb-8 flex flex-col`}>
                  <div className="flex items-center justify-between px-6 py-2">
                    <p className="text-[18px] font-normal text-[#2A3440]">Notifications</p>
                    <button
                      type="button"
                      className="flex items-center justify-center p-2 rounded-[4px] bg-[#ECF5FF]"
                      aria-label="Notification settings"
                    >
                      <img src="/nav-patterns/pattern-a/gear-solid.svg" alt="" className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="h-px w-full bg-[#E9ECEE] my-1" />
                  <div className="flex flex-col">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`flex gap-3 px-6 py-[13px] ${n.unread ? "bg-[#F7FAFE]" : "bg-white"}`}
                      >
                        <div className={`w-[6px] flex-shrink-0 rounded-full ${n.unread ? "bg-[#1A7BD9]" : ""}`} />
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <p className="text-[14px] text-[#2A3440] leading-[1.2]">{n.message}</p>
                          <p className="text-[10px] text-[#5D6A71]">{n.time}</p>
                          {n.unread && (
                            <button type="button" className="text-[10px] text-[#1A7BD9] text-left">
                              Set as read
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-px w-full bg-[#E9ECEE] my-1" />
                  <button type="button" className="px-6 pt-4 pb-3 text-left text-[14px] text-[#1A7BD9]">
                    View all Notifications
                  </button>
                </div>
              )}
            </div>

            {/* Account */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("account")}
                className="relative flex items-center justify-center w-14 h-14"
                aria-label="Account menu"
              >
                <span
                  className={`absolute inset-0 m-auto w-8 h-8 rounded-[6px] ${TRANSITION} ${
                    openDropdown === "account" ? "bg-[#1A7BD9]" : ""
                  }`}
                />
                <img
                  src={`/nav-patterns/pattern-a/${openDropdown === "account" ? "user-white" : "user"}.svg`}
                  alt=""
                  className="relative z-10 w-6 h-6"
                />
              </button>
              {openDropdown === "account" && (
                <div className={`${POPOVER_BASE} ${POPOVER_SMALL_SHADOW} w-[min(290px,calc(100vw-2rem))] p-4 flex flex-col gap-4`}>
                  <div className="flex gap-3 items-start pr-[10px] py-[10px]">
                    <div className="w-12 h-12 rounded-full bg-[#ECF5FF] flex items-center justify-center flex-shrink-0">
                      <img src="/nav-patterns/pattern-a/avatar-icon.svg" alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-2 min-w-0">
                      <p className="text-[18px] text-[#2A3440] whitespace-nowrap">Jordan Rivera</p>
                      <p className="text-[16px] text-[#5D6A71] whitespace-nowrap">jordan.rivera@example.com</p>
                    </div>
                  </div>
                  <div className="h-px w-full bg-[#E9ECEE]" />
                  <div className="flex flex-col gap-6">
                    {accountMenuItems.map((label) => (
                      <button key={label} type="button" className="text-left text-[18px] text-[#2A3440]">
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="h-px w-full bg-[#E9ECEE]" />
                  <button type="button" className="text-left text-[18px] text-[#2A3440]">
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto px-10 py-10">{children}</main>
      </div>
    </div>
  );
}
