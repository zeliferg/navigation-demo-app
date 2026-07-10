// Pattern D content area, pulled from Figma node 70:28308 ("Pattern D - content area").
// Used in place of the shared GridBody for Pattern D only. Fixed frame widths (1392px)
// from the source are replaced with responsive w-full / flex sizing.

const DIR = "/nav-patterns/pattern-d";

const stats = [
  { icon: "risk.svg", label: "Risk", value: "Low", gauge: true, suffix: "19/100" },
  { icon: "severity.svg", label: "Severity", value: "Low" },
  { icon: "instances.svg", label: "Instances", value: "23" },
  { icon: "density.svg", label: "Density", value: "43.47" },
];

function Select({ label, value, icon }: { label: string; value: string; icon?: string }) {
  return (
    <div className="flex flex-col gap-0.5 justify-center w-[164px]">
      <span className="text-[12.6px] leading-[1.5] text-[#333]">{label}</span>
      <div className="flex items-center gap-2.5 bg-white border border-[#D8D6D7] rounded-[4px] px-[13px] py-[7px]">
        <span className="flex-1 min-w-0 flex items-center gap-2 text-[14px] leading-[1.5] text-[#333] truncate">
          {icon && <img src={`${DIR}/${icon}`} alt="" className="w-3.5 h-3.5 flex-shrink-0" />}
          {value}
        </span>
        <img src={`${DIR}/select-chevron.svg`} alt="" className="w-3.5 h-3.5 flex-shrink-0" />
      </div>
    </div>
  );
}

function DetailGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-[12.6px] leading-[1.5] text-[#333]">{label}</span>
      <div className="flex gap-2 items-center">{children}</div>
    </div>
  );
}

export default function PatternDContent() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* container-top — metrics dashboard card */}
      <div className="bg-white border border-[#ECEBEA] rounded-[8px] p-6 flex flex-col gap-6 w-full">
        {/* Header: breadcrumb + title + description, with filter controls on the right */}
        <div className="flex flex-wrap gap-6 items-end w-full">
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <div className="flex items-center pb-1 text-[14px] leading-[1.5]">
              <a className="text-[#345D9D] underline" href="#">
                Home
              </a>
              <span className="px-2 text-[16px] text-[#D8D6D7]">/</span>
              <span className="text-[#6D6E71]">Component Dashboard</span>
            </div>
            <h1 className="font-bold text-[24px] leading-[1.5] text-[#333]">Component Dashboard</h1>
            <p className="text-[16px] leading-[1.5] text-[#6D6E71]">Description about the component dashboard.</p>
          </div>

          <div className="flex gap-2 items-end">
            <Select label="Source" value="Source Name" />
            <Select label="Component" value="Component" />
            <Select label="Filter View" value="WCAG 2.2 AA" icon="wcag-person.svg" />
            {/* Apply — disabled styling per the pulled data (#B1B3B6) */}
            <button
              type="button"
              className="bg-[#B1B3B6] border border-[#B1B3B6] rounded-[4px] px-[13px] pt-2 pb-[7px] text-[14px] leading-[1.5] text-white"
            >
              Apply
            </button>
            <button
              type="button"
              aria-label="Filter"
              className="flex items-center justify-center border border-[#ECEBEA] rounded-[4px] w-9 h-9"
            >
              <img src={`${DIR}/filter.svg`} alt="" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metrics row: stat cards + trend figures */}
        <div className="flex flex-wrap gap-6 items-stretch w-full">
          <div className="flex-1 min-w-0 flex flex-wrap gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex-1 min-w-[160px] bg-[#F7F7F7] rounded-[10px] p-4 flex flex-col gap-2"
              >
                <div className="flex gap-2 items-center">
                  <img src={`${DIR}/${s.icon}`} alt="" className="w-4 h-4" />
                  <span className="text-[14px] leading-[1.5] text-[#333]">{s.label}</span>
                  <img src={`${DIR}/info-sm.svg`} alt="" className="w-3.5 h-3.5" />
                </div>
                <div className="flex gap-2 items-center">
                  {s.gauge && <img src={`${DIR}/gauge.svg`} alt="" className="w-[52px] h-[26px]" />}
                  <span className="font-bold text-[24px] leading-[1.5] text-[#1A3B5C]">{s.value}</span>
                  {s.suffix && (
                    <span className="self-end text-[12.6px] leading-[1.5] text-[#6D6E71]">{s.suffix}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 items-start bg-white rounded-[10px]">
            <div className="flex flex-col gap-2 justify-center p-4">
              <span className="text-[14px] leading-[1.5] text-[#333]">From previous period</span>
              <div className="flex gap-2 items-center">
                <img src={`${DIR}/trend-up.svg`} alt="" className="w-4 h-4" />
                <span className="font-bold text-[24px] leading-[1.5] text-[#3F841F]">557.79%</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center p-4 w-[173px]">
              <span className="text-[14px] leading-[1.5] text-[#333]">Over lifetime</span>
              <div className="flex gap-2 items-center">
                <img src={`${DIR}/trend-down.svg`} alt="" className="w-4 h-4" />
                <span className="font-bold text-[24px] leading-[1.5] text-[#B9160A]">-25.12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* disclosure-widget-open — Component Details card */}
      <div className="bg-white border border-[#ECEBEA] rounded-[8px] p-6 flex flex-col gap-6 w-full">
        <div className="flex gap-2 items-center w-full">
          <h2 className="flex-1 min-w-0 font-semibold text-[21px] leading-[1.5] text-[#333]">Component Details</h2>
          <button
            type="button"
            aria-label="Collapse section"
            className="flex items-center justify-center border border-[#ECEBEA] rounded-[4px] w-9 h-9"
          >
            <img src={`${DIR}/collapse.svg`} alt="" className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-6 items-start w-full">
          {/* Component Notes */}
          <div className="flex-1 min-w-[280px] bg-white border border-[#ECEBEA] rounded-[8px] pl-6 pr-2 py-6 h-[268px] flex gap-4">
            <div className="flex-1 min-w-0 flex flex-col gap-4 overflow-hidden">
              <div className="flex gap-2 items-center w-full">
                <span className="flex-1 min-w-0 font-bold text-[14px] leading-[1.5] text-[#333]">
                  Component Notes
                </span>
                <button
                  type="button"
                  aria-label="Expand notes"
                  className="flex items-center justify-center border border-[#ECEBEA] rounded-[4px] w-8 h-8"
                >
                  <img src={`${DIR}/expand.svg`} alt="" className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[14px] leading-[1.5] text-[#333] overflow-y-auto pr-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          {/* Additional */}
          <div className="bg-white border border-[#ECEBEA] rounded-[8px] p-6 w-full md:w-[330px] h-[268px] flex flex-col gap-4">
            <span className="font-bold text-[14px] leading-[1.5] text-[#333]">Additional</span>
            <div className="flex flex-col gap-4">
              <DetailGroup label="Source Code">
                <span className="text-[14px] leading-[1.5] text-[#333]">Add</span>
              </DetailGroup>
              <DetailGroup label="JAWS Inspect">
                <a href="#" className="text-[14px] leading-[1.5] text-[#345D9D] underline">
                  View
                </a>
              </DetailGroup>
              <DetailGroup label="Assigned To">
                <span className="italic text-[14px] leading-[1.5] text-[#6D6E71]">Unassigned</span>
                <a href="#" className="text-[14px] leading-[1.5] text-[#345D9D] underline">
                  Add
                </a>
              </DetailGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
