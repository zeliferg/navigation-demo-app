"use client";

import { useEffect, useRef, useState } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

interface PatternBNavProps {
  children?: React.ReactNode;
}

interface NavLeaf {
  id: string;
  label: string;
}

interface NavGroup {
  id: string;
  label: string;
  children: (NavLeaf | NavGroup)[];
}

function isGroup(node: NavLeaf | NavGroup): node is NavGroup {
  return "children" in node;
}

const topItems = [
  { id: "dashboard", label: "Dashboard", icon: "/nav-patterns/pattern-b/home.svg" },
  { id: "event-calendar", label: "Event Calendar", icon: "/nav-patterns/pattern-b/calendar-month.svg" },
];

// Anonymized: pulled data used real-looking provider/satellite names
// (PlanetiQ, GHOMES-N) -> "Data Provider A" / "Satellite N".
const servicesItems: { id: string; label: string; icon: string; children?: (NavLeaf | NavGroup)[] }[] = [
  {
    id: "collision-risk",
    label: "Collision Risk Management",
    icon: "/nav-patterns/pattern-b/collision-risk.svg",
    children: [
      { id: "crm-ephemeris-management", label: "Ephemeris Management" },
      { id: "crm-event-summary", label: "Event Summary" },
      { id: "crm-hie-briefing", label: "HIE Briefing" },
      {
        id: "crm-risk-mitigation-maneuvers",
        label: "Risk Mitigation Maneuvers",
        children: [
          {
            id: "crm-rmm-data-provider-a",
            label: "Data Provider A",
            children: [
              { id: "crm-rmm-dpa-sat4", label: "Satellite 4" },
              { id: "crm-rmm-dpa-sat5", label: "Satellite 5" },
            ],
          },
        ],
      },
      {
        id: "crm-relative-phasing",
        label: "Relative Phasing",
        children: [{ id: "crm-rp-label", label: "Label" }],
      },
    ],
  },
  {
    id: "covariance-realism",
    label: "Covariance Realism",
    icon: "/nav-patterns/pattern-b/covariance-realism.svg",
    children: [
      {
        id: "cr-data-provider-a",
        label: "Data Provider A",
        children: [
          { id: "cr-dpa-sat4-batch", label: "Satellite 4 - Batch" },
          { id: "cr-dpa-sat5-batch", label: "Satellite 5 - Batch" },
        ],
      },
    ],
  },
  {
    id: "orbit-determination",
    label: "Orbit Determination",
    icon: "/nav-patterns/pattern-b/orbit-determination.svg",
    children: [
      {
        id: "od-data-provider-a",
        label: "Data Provider A",
        children: [
          { id: "od-dpa-sat2", label: "Satellite 2" },
          { id: "od-dpa-sat4-batch", label: "Satellite 4 - Batch" },
          { id: "od-dpa-sat4-ekf", label: "Satellite 4 - EKF" },
          { id: "od-dpa-sat5-batch", label: "Satellite 5 - Batch" },
          { id: "od-dpa-sat5-ekf", label: "Satellite 5 - EKF" },
        ],
      },
    ],
  },
  { id: "space-environment", label: "Space Environment Data", icon: "/nav-patterns/pattern-b/space-environment.svg" },
  { id: "maneuver-planning", label: "Maneuver Planning", icon: "/nav-patterns/pattern-b/maneuver-planning.svg" },
];

const utilitiesItems: { id: string; label: string; icon: string; children?: (NavLeaf | NavGroup)[] }[] = [
  { id: "3d-viewer", label: "3D Viewer", icon: "/nav-patterns/pattern-b/satellite-alt.svg" },
  {
    id: "space-object-info",
    label: "Space Object Information",
    icon: "/nav-patterns/pattern-b/chart-box-outline.svg",
    children: [
      { id: "soi-object-specific-details", label: "Object Specific Details" },
      { id: "soi-hbr-analysis", label: "HBR Analysis" },
    ],
  },
  {
    id: "manual-tools",
    label: "Manual Tools",
    icon: "/nav-patterns/pattern-b/home-repair-service.svg",
    children: [
      { id: "mt-maneuver-reconstruction", label: "Maneuver Reconstruction" },
      { id: "mt-file-upload", label: "File Upload" },
      { id: "mt-run-monitor-jobs", label: "Run and Monitor Jobs" },
      { id: "mt-hbr-analysis", label: "HBR Analysis" },
      {
        id: "mt-legacy-manual-tools",
        label: "Legacy Manual Tools",
        children: [
          { id: "mt-lmt-2d-pc-analysis", label: "2D PC Analysis" },
          { id: "mt-lmt-ephemeris-qa", label: "Ephemeris Q/A" },
          { id: "mt-lmt-ca-prediction", label: "CA Prediction" },
        ],
      },
    ],
  },
  { id: "documentation", label: "Documentation", icon: "/nav-patterns/pattern-b/help.svg" },
];

// Account settings menu, pulled from node 59:8406. Divider before "Logout" only.
const accountMenuItems = [
  { label: "User Settings", icon: "/nav-patterns/pattern-b/settings.svg" },
  { label: "Mission Settings", icon: "/nav-patterns/pattern-b/build.svg" },
  { label: "User Administration", icon: "/nav-patterns/pattern-b/user-admin.svg" },
  { label: "API Query Builder", icon: "/nav-patterns/pattern-b/arrow-outward.svg" },
  { label: "Contact Us", icon: "/nav-patterns/pattern-b/call.svg" },
  { label: "Release Notes", icon: "/nav-patterns/pattern-b/chat.svg" },
];

// States read from the Figma "Nav Main Categories Desktop" states sheet (52:6908),
// Dashboard item: Default (52:7118), Hover (52:7129), Selected (52:7150), and the
// Collision Risk Management "Fold"/"Unfold" pulls (52:6913/52:6925/52:7160) for the
// expandable-item variant. Default: no bg, text #3C3D42 (actual instance value).
// Hover: bg rgba(0,61,120,0.1), text unchanged. Selected: bg #E3EBF8, text #003D78.
// Font-weight never changes across any state. Icon color never changes across states.
const HOVER_BG = "hover:bg-[rgba(0,61,120,0.1)]";
const TRANSITION = "transition-colors duration-150";

const INDENT_BASE = 56; // Secondary Categories (Figma pl-[56px])
const INDENT_STEP = 16; // +16px per nesting level (56 -> 72 -> 88, matches pulled data)

function LeafRow({
  label,
  active,
  onClick,
  depth,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  depth: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ paddingLeft: INDENT_BASE + (depth - 1) * INDENT_STEP }}
      className={`flex items-center h-11 pr-2 rounded w-full text-left ${TRANSITION} ${
        active ? "bg-[#E3EBF8]" : HOVER_BG
      }`}
    >
      <span className={`text-[16px] leading-[1.5] tracking-[0.15px] truncate ${active ? "text-[#003D78]" : "text-[#3C3D42]"}`}>
        {label}
      </span>
    </button>
  );
}

function GroupRow({
  label,
  open,
  onToggle,
  depth,
  icon,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  depth: number;
  icon?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={depth > 0 ? { paddingLeft: INDENT_BASE + (depth - 1) * INDENT_STEP } : undefined}
      className={`flex items-center gap-2 h-11 px-2 rounded w-full ${TRANSITION} ${HOVER_BG}`}
    >
      {icon && <img src={icon} alt="" className="w-6 h-6 flex-shrink-0" />}
      <span className="flex-1 min-w-0 text-[16px] leading-[1.5] tracking-[0.15px] text-[#3C3D42] truncate text-left">
        {label}
      </span>
      <img
        src="/nav-patterns/pattern-b/expand-chevron.svg"
        alt=""
        className={`w-6 h-6 flex-shrink-0 transition-transform duration-150 ${open ? "" : "scale-y-[-1]"}`}
      />
    </button>
  );
}

function NavTree({
  nodes,
  depth,
  activeId,
  setActiveId,
  openGroups,
  toggleGroup,
}: {
  nodes: (NavLeaf | NavGroup)[];
  depth: number;
  activeId: string;
  setActiveId: (id: string) => void;
  openGroups: Set<string>;
  toggleGroup: (id: string) => void;
}) {
  return (
    <>
      {nodes.map((node) => {
        if (isGroup(node)) {
          const open = openGroups.has(node.id);
          return (
            <div key={node.id} className="flex flex-col w-full">
              <GroupRow label={node.label} open={open} onToggle={() => toggleGroup(node.id)} depth={depth} />
              {open && (
                <NavTree
                  nodes={node.children}
                  depth={depth + 1}
                  activeId={activeId}
                  setActiveId={setActiveId}
                  openGroups={openGroups}
                  toggleGroup={toggleGroup}
                />
              )}
            </div>
          );
        }
        return (
          <LeafRow
            key={node.id}
            label={node.label}
            active={activeId === node.id}
            onClick={() => setActiveId(node.id)}
            depth={depth}
          />
        );
      })}
    </>
  );
}

function AccountMenuPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute bottom-full left-0 mb-2 w-[min(293px,calc(100vw-2rem))] bg-white rounded-[6px] p-2 flex flex-col shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_4px_2.5px_0px_rgba(0,0,0,0.14),0px_2px_2px_0px_rgba(0,0,0,0.2)] z-50">
      {accountMenuItems.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={onClose}
          className={`flex items-center gap-2 h-11 p-2 rounded w-full ${TRANSITION} ${HOVER_BG}`}
        >
          <img src={item.icon} alt="" className="w-6 h-6 flex-shrink-0" />
          <span className="text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.5px] truncate text-left">
            {item.label}
          </span>
        </button>
      ))}
      <div className="h-px w-full bg-black/10 my-1" />
      <button
        type="button"
        onClick={onClose}
        className={`flex items-center gap-2 h-11 p-2 rounded w-full ${TRANSITION} ${HOVER_BG}`}
      >
        <img src="/nav-patterns/pattern-b/logout.svg" alt="" className="w-6 h-6 flex-shrink-0" />
        <span className="text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.5px] truncate text-left">Logout</span>
      </button>
    </div>
  );
}

function TopNavRow({
  icon,
  label,
  active = false,
  expanded,
  hasChildren = false,
  open = false,
  onClick,
}: {
  icon: string;
  label: string;
  active?: boolean;
  expanded: boolean;
  hasChildren?: boolean;
  open?: boolean;
  onClick: () => void;
}) {
  if (!expanded) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center justify-center w-full h-11 p-2 rounded ${TRANSITION} ${
          active ? "bg-[#E3EBF8]" : HOVER_BG
        }`}
      >
        <img src={icon} alt="" className="w-6 h-6 flex-shrink-0" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 h-12 rounded-lg w-full ${TRANSITION} ${
        active ? "bg-[#E3EBF8]" : HOVER_BG
      }`}
    >
      <img src={icon} alt="" className="w-6 h-6 flex-shrink-0" />
      <span
        className={`flex-1 min-w-0 text-[16px] leading-[1.5] tracking-[0.15px] truncate text-left ${
          active ? "text-[#003D78]" : "text-[#3C3D42]"
        }`}
      >
        {label}
      </span>
      {hasChildren && (
        <img
          src="/nav-patterns/pattern-b/expand-chevron.svg"
          alt=""
          className={`w-6 h-6 flex-shrink-0 transition-transform duration-150 ${open ? "" : "scale-y-[-1]"}`}
        />
      )}
    </button>
  );
}

export default function PatternBNav({ children }: PatternBNavProps) {
  const [expanded, setExpanded] = useState(true);
  const [activeId, setActiveId] = useState("dashboard");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accountMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [accountMenuOpen]);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderSection = (items: typeof servicesItems) =>
    items.map((item) => {
      if (item.children) {
        const open = openGroups.has(item.id);
        return (
          <div key={item.id} className="flex flex-col w-full">
            <TopNavRow
              icon={item.icon}
              label={item.label}
              expanded={expanded}
              hasChildren
              open={open}
              onClick={() => toggleGroup(item.id)}
            />
            {expanded && open && (
              <NavTree
                nodes={item.children}
                depth={1}
                activeId={activeId}
                setActiveId={setActiveId}
                openGroups={openGroups}
                toggleGroup={toggleGroup}
              />
            )}
          </div>
        );
      }
      return (
        <TopNavRow
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={activeId === item.id}
          expanded={expanded}
          onClick={() => setActiveId(item.id)}
        />
      );
    });

  return (
    <div className={`${roboto.className} flex h-screen w-full bg-[#F5F5F5]`}>
      {/* Sidebar */}
      <aside
        className={`relative w-full ${
          expanded ? "max-w-[296px]" : "max-w-[64px]"
        } transition-[max-width] duration-200 ease-in-out bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] flex flex-col overflow-visible`}
      >
        {/* Logo */}
        {expanded ? (
          <div className="flex items-center justify-between pl-4 pr-[5px] pt-[11px] pb-[27px] h-[34px] box-content">
            <span className="font-medium text-[16px] tracking-[0.17px] text-[#003D78] whitespace-nowrap">
              Placeholder Logo
            </span>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Collapse sidebar"
              className="flex-shrink-0"
            >
              <img src="/nav-patterns/pattern-b/stat-minus-2.svg" alt="" className="w-6 h-6 rotate-90" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center pt-6">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-label="Expand sidebar"
              className="flex items-center justify-center h-11 w-11"
            >
              <img src="/nav-patterns/pattern-b/stat-minus-2.svg" alt="" className="w-6 h-6 -rotate-90" />
            </button>
            <div className="h-px w-full bg-black/10" />
          </div>
        )}

        {/* Nav list */}
        <nav className={`flex-1 overflow-y-auto flex flex-col pb-2 ${expanded ? "px-2" : "px-1"}`}>
          <div className="flex flex-col pb-2">
            {topItems.map((item) => (
              <TopNavRow
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeId === item.id}
                expanded={expanded}
                onClick={() => setActiveId(item.id)}
              />
            ))}
          </div>

          <div className="flex flex-col pb-2">
            {expanded ? (
              <div className="px-4 py-1">
                <span className="font-medium text-[16px] tracking-[0.15px] text-[#121826]">Services</span>
              </div>
            ) : (
              <div className="h-px w-full bg-black/10 mb-2" />
            )}
            {renderSection(servicesItems)}
          </div>

          <div className="flex flex-col">
            {expanded ? (
              <div className="px-4 py-1">
                <span className="font-medium text-[16px] tracking-[0.15px] text-[#121826]">Utilities</span>
              </div>
            ) : (
              <div className="h-px w-full bg-black/10 mb-2" />
            )}
            {renderSection(utilitiesItems)}
          </div>
        </nav>

        {/* Profile section - pinned to bottom, outside the scrolling nav so it stays visible */}
        <div ref={accountMenuRef} className={`flex-shrink-0 flex flex-col gap-2 pb-[10px] ${expanded ? "" : "items-center"}`}>
          <div className="h-px w-full bg-black/10" />
          {expanded ? (
            <div className="flex items-center gap-2 px-2 h-10 w-full">
              <img src="/nav-patterns/pattern-b/generic-avatar.svg" alt="" className="w-8 h-8 flex-shrink-0" />
              <span className="flex-1 text-[16px] text-[#121826] truncate text-left">Account Name</span>
              {/* Trigger - the menu anchors to this element specifically, not the row */}
              <div className="relative flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((prev) => !prev)}
                  className={`flex items-center justify-center w-10 h-10 rounded-[6px] ${TRANSITION} ${
                    accountMenuOpen ? "bg-[#EAF2FD]" : ""
                  }`}
                >
                  <img src="/nav-patterns/pattern-b/more-horiz.svg" alt="" className="w-6 h-6" />
                </button>
                {accountMenuOpen && <AccountMenuPopup onClose={() => setAccountMenuOpen(false)} />}
              </div>
            </div>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountMenuOpen((prev) => !prev)}
                className="flex items-center justify-center h-10 w-10"
              >
                <img src="/nav-patterns/pattern-b/generic-avatar.svg" alt="" className="w-8 h-8 flex-shrink-0" />
              </button>
              {accountMenuOpen && <AccountMenuPopup onClose={() => setAccountMenuOpen(false)} />}
            </div>
          )}
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-12 bg-white border-b border-black/10 flex items-center justify-between px-10 flex-shrink-0">
          <div />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/nav-patterns/pattern-b/calendar-today.svg" alt="" className="w-6 h-6" />
              <span className="text-[12px] font-medium tracking-[0.17px] leading-[1.43] text-black/56 whitespace-nowrap">
                2025-10-01 17:24:59 &nbsp;&nbsp; DOY: 274.73
              </span>
            </div>
            <div className="relative">
              <div className="flex items-center justify-center w-[34px] h-[34px] rounded-lg bg-white p-2">
                <img src="/nav-patterns/pattern-b/notifications.svg" alt="" className="w-6 h-6" />
              </div>
              <div className="absolute -top-[3px] -right-1 flex items-center justify-center px-[6.5px] h-4 rounded-full bg-[#C62828]">
                <span className="text-[12px] font-medium tracking-[0.14px] text-white leading-[20px]">3</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto bg-[#F5F5F5] px-10 py-10">{children}</main>
      </div>
    </div>
  );
}
