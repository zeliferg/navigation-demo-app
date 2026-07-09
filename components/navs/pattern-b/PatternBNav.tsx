import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

interface PatternBNavProps {
  children?: React.ReactNode;
}

const topItems = [
  { label: "Dashboard", icon: "/nav-patterns/pattern-b/home.svg", active: true },
  { label: "Event Calendar", icon: "/nav-patterns/pattern-b/calendar-month.svg", active: false },
];

const servicesItems = [
  { label: "Collision Risk Management", icon: "/nav-patterns/pattern-b/collision-risk.svg", expandable: true },
  { label: "Covariance Realism", icon: "/nav-patterns/pattern-b/covariance-realism.svg", expandable: true },
  { label: "Orbit Determination", icon: "/nav-patterns/pattern-b/orbit-determination.svg", expandable: true },
  { label: "Space Environment Data", icon: "/nav-patterns/pattern-b/space-environment.svg", expandable: false },
  { label: "Maneuver Planning", icon: "/nav-patterns/pattern-b/maneuver-planning.svg", expandable: false },
];

const utilitiesItems = [
  { label: "3D Viewer", icon: "/nav-patterns/pattern-b/satellite-alt.svg", expandable: false },
  { label: "Space Object Information", icon: "/nav-patterns/pattern-b/chart-box-outline.svg", expandable: true },
  { label: "Manual Tools", icon: "/nav-patterns/pattern-b/home-repair-service.svg", expandable: true },
  { label: "Documentation", icon: "/nav-patterns/pattern-b/help.svg", expandable: false },
];

function NavRow({
  icon,
  label,
  active = false,
  expandable = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
  expandable?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full ${active ? "bg-[#E3EBF8]" : ""}`}
    >
      <img src={icon} alt="" className="w-6 h-6 flex-shrink-0" />
      <span
        className={`flex-1 text-[16px] leading-[1.5] tracking-[0.15px] min-w-0 truncate ${
          active ? "text-[#003D78]" : "text-[#3C3D42]"
        }`}
      >
        {label}
      </span>
      {expandable && (
        <img
          src="/nav-patterns/pattern-b/expand-chevron.svg"
          alt=""
          className="w-6 h-6 flex-shrink-0 scale-y-[-1]"
        />
      )}
    </div>
  );
}

export default function PatternBNav({ children }: PatternBNavProps) {
  return (
    <div className={`${roboto.className} flex h-screen w-full bg-[#F5F5F5]`}>
      {/* Sidebar */}
      <aside className="relative w-[296px] flex-shrink-0 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] flex flex-col overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center justify-between pl-4 pr-[5px] pt-[11px] pb-2">
          <span className="font-medium text-[16px] tracking-[0.17px] text-[#003D78]">Placeholder Logo</span>
          <img src="/nav-patterns/pattern-b/stat-minus-2.svg" alt="" className="w-6 h-6 rotate-90" />
        </div>

        {/* Nav list */}
        <nav className="flex flex-col px-2 pb-2 gap-0.5">
          <div className="flex flex-col gap-0.5 pb-2">
            {topItems.map((item) => (
              <NavRow key={item.label} icon={item.icon} label={item.label} active={item.active} />
            ))}
          </div>

          <div className="flex flex-col pb-2">
            <div className="px-4 py-1">
              <span className="font-medium text-[16px] tracking-[0.15px] text-[#121826]">Services</span>
            </div>
            {servicesItems.map((item) => (
              <NavRow key={item.label} icon={item.icon} label={item.label} expandable={item.expandable} />
            ))}
          </div>

          <div className="flex flex-col">
            <div className="px-4 py-1">
              <span className="font-medium text-[16px] tracking-[0.15px] text-[#121826]">Utilities</span>
            </div>
            {utilitiesItems.map((item) => (
              <NavRow key={item.label} icon={item.icon} label={item.label} expandable={item.expandable} />
            ))}
          </div>
        </nav>

        {/* Profile section - pinned to bottom */}
        <div className="mt-auto flex flex-col gap-2 pb-[10px]">
          <div className="h-px w-full bg-black/10" />
          <div className="flex items-center gap-2 px-2 h-10">
            <img src="/nav-patterns/pattern-b/generic-avatar.svg" alt="" className="w-8 h-8 flex-shrink-0" />
            <span className="flex-1 text-[16px] text-[#121826] truncate">Account Name</span>
            <img src="/nav-patterns/pattern-b/more-horiz.svg" alt="" className="w-6 h-6 flex-shrink-0" />
          </div>
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
