"use client";

import { useEffect, useRef, useState } from "react";

interface PatternCNavProps {
  children?: React.ReactNode;
}

interface NavChild {
  id: string;
  label: string;
  icon: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  children?: NavChild[];
}

const ICON = "/nav-patterns/pattern-c";

// Anonymized: "Surge Scoring" (a client-specific product feature name) -> "Lead Scoring".
// The rest are generic B2B-analytics terms, kept as pulled.
const mainItems: NavItem[] = [
  { id: "home", label: "Home", icon: `${ICON}/home.svg` },
  { id: "insights", label: "Insights", icon: `${ICON}/insights.svg` },
  {
    id: "report-manager",
    label: "Report Manager",
    icon: `${ICON}/report-manager.svg`,
    children: [
      { id: "attribution", label: "Attribution", icon: `${ICON}/attribution.svg` },
      { id: "data-health", label: "Data Health", icon: `${ICON}/health.svg` },
      { id: "funnels", label: "Funnels", icon: `${ICON}/funnel.svg` },
      { id: "lead-scoring", label: "Lead Scoring", icon: `${ICON}/surge.svg` },
    ],
  },
  { id: "lists", label: "Lists", icon: `${ICON}/list.svg` },
  { id: "notifications", label: "Notifications", icon: `${ICON}/notification.svg` },
];

const helpItem: NavItem = {
  id: "help",
  label: "Help",
  icon: `${ICON}/help-circle.svg`,
  children: [
    { id: "knowledge-base", label: "Knowledge Base", icon: `${ICON}/knowledge-base.svg` },
    { id: "data-dictionary", label: "Data Dictionary", icon: `${ICON}/data-dictionary.svg` },
    { id: "release-notes", label: "Release Notes", icon: `${ICON}/releases.svg` },
    { id: "support-request", label: "Support request", icon: `${ICON}/support.svg` },
  ],
};

// Collapsed-drawer slim rail order (icon-only): main items + Help, then Account/Logout at bottom.
const slimItems: NavItem[] = [...mainItems, helpItem];

// Active-state values from Figma node 64:9248:
// Primary selected: bg rgba(40,84,138,0.24), text #001022. Secondary selected: bg
// rgba(42,73,112,0.1), text #001022. Inactive text: rgba(0,16,34,0.67). Text is always
// Circular Std Medium; only bg + text color change between states.
const ACTIVE_PRIMARY_BG = "bg-[rgba(40,84,138,0.24)]";
const ACTIVE_SECONDARY_BG = "bg-[rgba(42,73,112,0.1)]";
const ACTIVE_TEXT = "text-[#001022]";
const INACTIVE_TEXT = "text-[rgba(0,16,34,0.67)]";
const HOVER_BG = "hover:bg-[rgba(42,73,112,0.06)]";
const TRANSITION = "transition-colors duration-150";

function PrimaryRow({
  item,
  active,
  open,
  onClick,
  hasChildren = false,
}: {
  item: { icon?: string; label: string };
  active: boolean;
  open?: boolean;
  onClick: () => void;
  hasChildren?: boolean;
}) {
  return (
    <div className="px-2 py-0.5 w-full">
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center gap-2 px-2 py-1 rounded w-full text-left ${TRANSITION} ${
          active ? ACTIVE_PRIMARY_BG : HOVER_BG
        }`}
      >
        {item.icon ? (
          <img src={item.icon} alt="" className="w-6 h-6 flex-shrink-0" />
        ) : (
          <span className="w-6 h-6 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0 py-1">
          <span
            className={`block font-medium text-[18px] leading-[22px] tracking-[-0.43px] truncate ${
              active ? ACTIVE_TEXT : INACTIVE_TEXT
            }`}
          >
            {item.label}
          </span>
        </div>
        {hasChildren && (
          <img
            src={`${ICON}/carat-down.svg`}
            alt=""
            className={`w-6 h-6 flex-shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>
    </div>
  );
}

function SecondaryRow({ item, active, onClick }: { item: NavChild; active: boolean; onClick: () => void }) {
  return (
    <div className="px-2 py-0.5 w-full">
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center gap-2 pl-10 pr-2 py-0.5 rounded w-full text-left ${TRANSITION} ${
          active ? ACTIVE_SECONDARY_BG : HOVER_BG
        }`}
      >
        <img src={item.icon} alt="" className="w-5 h-5 flex-shrink-0" />
        <div className="flex-1 min-w-0 py-1">
          <span
            className={`block font-medium text-[16px] leading-[22px] tracking-[-0.43px] truncate ${
              active ? ACTIVE_TEXT : INACTIVE_TEXT
            }`}
          >
            {item.label}
          </span>
        </div>
      </button>
    </div>
  );
}

export default function PatternCNav({ children }: PatternCNavProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [flyoutId, setFlyoutId] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (!flyoutId) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setFlyoutId(null);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [flyoutId]);

  const renderExpandableGroup = (item: NavItem) => {
    const open = openGroups.has(item.id);
    const childActive = item.children?.some((c) => c.id === activeId) ?? false;
    return (
      <div key={item.id} className="w-full">
        <PrimaryRow
          item={item}
          active={activeId === item.id || (!open && childActive)}
          open={open}
          hasChildren
          onClick={() => toggleGroup(item.id)}
        />
        {open &&
          item.children?.map((child) => (
            <SecondaryRow
              key={child.id}
              item={child}
              active={activeId === child.id}
              onClick={() => setActiveId(child.id)}
            />
          ))}
      </div>
    );
  };

  // Collapsed-drawer slim icon button, with optional flyout of its children.
  const SlimRow = ({ item }: { item: NavItem }) => {
    const hasChildren = !!item.children?.length;
    const childActive = item.children?.some((c) => c.id === activeId) ?? false;
    const active = activeId === item.id || childActive || flyoutId === item.id;
    return (
      <div className="relative px-1 w-full">
        <button
          type="button"
          onClick={() => {
            if (hasChildren) {
              setFlyoutId((prev) => (prev === item.id ? null : item.id));
            } else {
              setActiveId(item.id);
              setFlyoutId(null);
            }
          }}
          className={`flex items-center justify-center h-12 w-full rounded ${TRANSITION} ${
            active ? ACTIVE_PRIMARY_BG : HOVER_BG
          }`}
          aria-label={item.label}
        >
          <img src={item.icon} alt="" className="w-6 h-6" />
        </button>
        {hasChildren && flyoutId === item.id && (
          <div className="absolute left-full top-0 ml-1 z-50 w-[218px] bg-white rounded shadow-[0px_0px_2.5px_0px_rgba(0,0,0,0.15)] py-2">
            {item.children?.map((child) => (
              <SecondaryRow
                key={child.id}
                item={child}
                active={activeId === child.id}
                onClick={() => {
                  setActiveId(child.id);
                  setFlyoutId(null);
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`relative w-full ${
          collapsed ? "max-w-[64px]" : "max-w-[294px]"
        } transition-[max-width] duration-200 ease-in-out flex-shrink-0 bg-white shadow-[1px_0px_4px_0px_rgba(0,0,0,0.15)] flex flex-col overflow-visible`}
      >
        {collapsed ? (
          <>
            {/* Collapsed logo + expand toggle */}
            <div className="flex flex-col items-center gap-2 pt-6 pb-2 flex-shrink-0">
              <div className="w-9 h-9 rounded bg-[#001022] flex-shrink-0" />
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                aria-label="Expand sidebar"
                className="flex items-center justify-center w-6 h-6 rounded bg-[rgba(42,73,112,0.1)]"
              >
                <img src={`${ICON}/arrow-right.svg`} alt="" className="w-4 h-4" />
              </button>
            </div>

            {/* Slim rail */}
            <nav className="flex-1 flex flex-col py-2 overflow-visible">
              {slimItems.map((item) => (
                <SlimRow key={item.id} item={item} />
              ))}
            </nav>

            {/* Bottom: Account + Logout */}
            <div className="flex-shrink-0 flex flex-col py-4">
              <div className="px-1 w-full">
                <button
                  type="button"
                  onClick={() => setActiveId("account")}
                  aria-label="Account"
                  className={`flex items-center justify-center h-12 w-full rounded ${TRANSITION} ${
                    activeId === "account" ? ACTIVE_PRIMARY_BG : HOVER_BG
                  }`}
                >
                  <img src={`${ICON}/account.svg`} alt="" className="w-6 h-6" />
                </button>
              </div>
              <div className="px-1 w-full">
                <button
                  type="button"
                  aria-label="Logout"
                  className={`flex items-center justify-center h-12 w-full rounded ${TRANSITION} ${HOVER_BG}`}
                >
                  <img src={`${ICON}/log-out.svg`} alt="" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Logo + collapse toggle */}
            <div className="relative flex items-center h-14 px-2 flex-shrink-0 mt-2">
              <span className="font-bold text-[24px] leading-[0.95] text-[#001022] truncate">Placeholder Logo</span>
              <button
                type="button"
                onClick={() => setCollapsed(true)}
                aria-label="Collapse sidebar"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded bg-[rgba(42,73,112,0.1)]"
              >
                <img src={`${ICON}/arrow-left.svg`} alt="" className="w-4 h-4" />
              </button>
            </div>

            {/* Nav list */}
            <nav className="flex-1 overflow-y-auto flex flex-col py-2">
              {mainItems.map((item) =>
                item.children ? (
                  renderExpandableGroup(item)
                ) : (
                  <PrimaryRow
                    key={item.id}
                    item={item}
                    active={activeId === item.id}
                    onClick={() => setActiveId(item.id)}
                  />
                )
              )}

              {/* Help group sits below the main list */}
              {renderExpandableGroup(helpItem)}
            </nav>

            {/* Bottom menu - Settings/Logout, pinned to bottom */}
            <div className="flex-shrink-0 flex flex-col py-4">
              {/* Settings has no icon asset in the pulled Figma data (empty placeholder in source) */}
              <PrimaryRow
                item={{ label: "Settings" }}
                active={activeId === "settings"}
                onClick={() => setActiveId("settings")}
              />
              <PrimaryRow
                item={{ icon: `${ICON}/log-out.svg`, label: "Logout" }}
                active={false}
                onClick={() => {}}
              />
            </div>
          </>
        )}
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="w-full flex items-center justify-between gap-10 bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)] px-10 py-6 flex-shrink-0">
          <p className="text-[20px] leading-[1.2] font-medium text-black flex-shrink-0">Home</p>

          <div className="flex items-center w-full max-w-[472px] border border-black/23 rounded overflow-hidden">
            <div className="flex-1 min-w-0 flex items-center gap-2 pl-3 py-3">
              <span className="text-[16px] leading-[18px] tracking-[-0.23px] text-black/60 truncate">Accounts</span>
              <img src={`${ICON}/carat-down.svg`} alt="" className="w-5 h-5 flex-shrink-0" />
            </div>
            <button
              type="button"
              aria-label="Search"
              className="flex items-center justify-center bg-[#001022] w-[54px] h-[50px] flex-shrink-0"
            >
              <img src={`${ICON}/search.svg`} alt="" className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto px-10 py-10">{children}</main>
      </div>
    </div>
  );
}
