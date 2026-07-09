interface PatternCNavProps {
  children?: React.ReactNode;
}

const mainNavItems = [
  { id: "home", label: "Home", icon: "/nav-patterns/pattern-c/home.svg", active: true },
  { id: "insights", label: "Insights", icon: "/nav-patterns/pattern-c/insights.svg" },
  { id: "report-manager", label: "Report Manager", icon: "/nav-patterns/pattern-c/report-manager.svg", expandable: true },
  { id: "lists", label: "Lists", icon: "/nav-patterns/pattern-c/list.svg" },
  { id: "notifications", label: "Notifications", icon: "/nav-patterns/pattern-c/notification.svg" },
  { id: "help", label: "Help", icon: "/nav-patterns/pattern-c/help-circle.svg", expandable: true },
];

function NavRow({
  icon,
  label,
  active = false,
  expandable = false,
}: {
  icon?: string;
  label: string;
  active?: boolean;
  expandable?: boolean;
}) {
  return (
    <div className="px-2 py-0.5 w-full">
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded w-full ${active ? "bg-[rgba(40,84,138,0.24)]" : ""}`}
      >
        {icon ? (
          <img src={icon} alt="" className="w-6 h-6 flex-shrink-0" />
        ) : (
          <span className="w-6 h-6 flex-shrink-0" />
        )}
        <span
          className={`flex-1 min-w-0 text-[18px] leading-[22px] tracking-[-0.43px] truncate ${
            active ? "font-medium text-[#001022]" : "text-[rgba(0,16,34,0.67)]"
          }`}
        >
          {label}
        </span>
        {expandable && (
          <img src="/nav-patterns/pattern-c/carat-down.svg" alt="" className="w-6 h-6 flex-shrink-0" />
        )}
      </div>
    </div>
  );
}

export default function PatternCNav({ children }: PatternCNavProps) {
  return (
    <div className="flex h-screen w-full bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="relative w-full max-w-[294px] flex-shrink-0 bg-white shadow-[1px_0px_4px_0px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
        {/* Logo */}
        <div className="relative flex items-center h-14 px-2 flex-shrink-0">
          <span className="font-bold text-[24px] leading-[0.95] text-[#001022] truncate">Placeholder Logo</span>
          <button
            type="button"
            aria-label="Collapse sidebar"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded bg-[rgba(42,73,112,0.1)]"
          >
            <img src="/nav-patterns/pattern-c/arrow-left.svg" alt="" className="w-4 h-4" />
          </button>
        </div>

        {/* Nav list */}
        <nav className="flex-1 overflow-y-auto flex flex-col py-2">
          {mainNavItems.map((item) => (
            <NavRow key={item.id} icon={item.icon} label={item.label} active={item.active} expandable={item.expandable} />
          ))}
        </nav>

        {/* Bottom menu - Settings/Logout, pinned to bottom */}
        <div className="flex-shrink-0 flex flex-col py-4">
          {/* Settings has no icon asset in the pulled Figma data (empty placeholder in source) */}
          <NavRow label="Settings" />
          <NavRow icon="/nav-patterns/pattern-c/log-out.svg" label="Logout" />
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="w-full flex items-center justify-between gap-10 bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)] px-10 py-6 flex-shrink-0">
          <p className="text-[20px] leading-[1.2] font-medium text-black flex-shrink-0">Home</p>

          <div className="flex items-center w-full max-w-[472px] border border-black/23 rounded overflow-hidden">
            <div className="flex-1 min-w-0 flex items-center gap-2 pl-3 py-3">
              <span className="text-[16px] leading-[18px] tracking-[-0.23px] text-black/60 truncate">Accounts</span>
              <img src="/nav-patterns/pattern-c/carat-down.svg" alt="" className="w-5 h-5 flex-shrink-0" />
            </div>
            <button
              type="button"
              aria-label="Search"
              className="flex items-center justify-center bg-[#001022] w-[54px] h-[50px] flex-shrink-0"
            >
              <img src="/nav-patterns/pattern-c/search.svg" alt="" className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto px-10 py-10">{children}</main>
      </div>
    </div>
  );
}
