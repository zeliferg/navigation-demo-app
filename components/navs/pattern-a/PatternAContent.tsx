// Pattern A content area, pulled from Figma node 73:8395 ("Main Frame" — data table view).
// Used in place of the shared GridBody for Pattern A only. The source's fixed frame widths
// (1066/1064/984px columns) are replaced with responsive w-full / flex sizing. Names, prices
// and labels are the design's own generic placeholders (Name 1, $10.00, Group1, Header1).

const ICON = "/nav-patterns/pattern-a";

interface TableRow {
  name: string;
  userType: string;
  price: string;
  available: string;
  soldOut?: boolean;
  permits: string;
  info?: boolean;
}

const rows: TableRow[] = [
  { name: "Name 1", userType: "Available to All", price: "$10.00", available: "25", permits: "5 Permits" },
  { name: "Name 2", userType: "Available to All", price: "$3.00", available: "2", permits: "5 Permits" },
  {
    name: "Name 3",
    userType: "Available to All",
    price: "$0.00",
    available: "Sold Out",
    soldOut: true,
    permits: "5 Permits",
    info: true,
  },
];

const headers = ["Name", "User Type", "Price", "Available"];

// Green "N Permits" pill: bg #A5F3A8, rounded-24, px-12 py-4, 12px #202227.
function PermitsBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center bg-[#A5F3A8] rounded-[24px] px-3 py-1 text-[12px] leading-[1.2] text-[#202227] whitespace-nowrap">
      {label}
    </span>
  );
}

function SortHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 h-14 shadow-[0px_1px_0px_0px_#e9ecee]">
      <span className="flex-1 min-w-0 font-bold text-[14px] leading-[1.2] text-[#202227]">{label}</span>
      <img src={`${ICON}/sort.svg`} alt="" className="w-4 h-4 flex-shrink-0" />
    </div>
  );
}

export default function PatternAContent() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Breadcrumb + page title */}
      <div className="flex flex-col gap-4 w-full">
        <p className="text-[14px] leading-[1.2]">
          <span className="text-[#1A7BD9]">Basic Information </span>
          <span className="text-[#2A3440]">/ </span>
          <span className="font-bold text-[#1A7BD9]">Property 1</span>
        </p>
        <h1 className="font-bold text-[32px] leading-[1.2] text-[#101828]">Property 1</h1>
      </div>

      {/* Card */}
      <div className="bg-white border border-[#E9ECEE] rounded-[8px] px-6 md:px-10 py-8 flex flex-col gap-6 w-full">
        {/* Card header: title + outline button */}
        <div className="flex items-center justify-between gap-4 w-full">
          <p className="font-semibold text-[18px] leading-[1.2] text-[#2A3440]">Header1</p>
          <button
            type="button"
            className="flex items-center justify-center bg-white border border-[#1A7BD9] rounded-[6px] pl-3 pr-4 py-[11px] font-bold text-[16px] leading-normal tracking-[0.16px] text-[#1A7BD9] whitespace-nowrap"
          >
            Lorem Ipsum
          </button>
        </div>

        {/* Group bar */}
        <div className="bg-[#f7fafe] rounded-[8px] p-4 w-full">
          <p className="font-bold text-[14px] leading-[1.2] text-[#202227]">Group1</p>
        </div>

        {/* Table */}
        <div className="border border-[#e9ecee] rounded-[4px] w-full overflow-x-auto">
          <div className="min-w-[720px]">
            {/* Header + data grid */}
            <div className="flex items-stretch bg-white">
              {/* First four flexible columns */}
              {headers.map((h) => (
                <div key={h} className="flex-1 min-w-0 flex flex-col">
                  <SortHeader label={h} />
                  {rows.map((row, i) => {
                    const value =
                      h === "Name"
                        ? row.name
                        : h === "User Type"
                        ? row.userType
                        : h === "Price"
                        ? row.price
                        : row.available;
                    const isSoldOut = h === "Available" && row.soldOut;
                    return (
                      <div key={i} className="flex items-center h-14 px-4">
                        <p
                          className={`flex-1 min-w-0 text-[14px] leading-[1.2] ${
                            isSoldOut ? "text-[#cd0014]" : "text-[#434f59]"
                          }`}
                        >
                          {value}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Active Permits column (badge + info) */}
              <div className="w-[190px] flex-shrink-0 flex flex-col">
                <SortHeader label="Active Permits" />
                {rows.map((row, i) => (
                  <div key={i} className="flex items-center gap-4 h-14 px-4">
                    <PermitsBadge label={row.permits} />
                    {row.info && (
                      <button
                        type="button"
                        aria-label="More info"
                        className="flex items-center justify-center bg-[#ecf5ff] rounded-[4px] w-4 h-4 flex-shrink-0"
                      >
                        <img src={`${ICON}/info-i.svg`} alt="" className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Table bottom nav */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white border-t border-[#e9ecee] px-4 py-1 rounded-b-[4px]">
              <div className="flex items-center gap-4">
                <span className="text-[14px] leading-[1.2] text-[#2a3440]">Show records</span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center bg-[#f7fafe] border border-[#1a7bd9] rounded-[4px] h-8 px-2 font-medium text-[14px] leading-5 text-[#004c95]">
                    5
                  </span>
                  <span className="flex items-center justify-center bg-[#f8fafb] border border-[#c7cfce] rounded-[4px] h-8 px-2 font-medium text-[14px] leading-5 text-[#778588]">
                    10
                  </span>
                  <span className="flex items-center justify-center bg-[#f8fafb] border border-[#c7cfce] rounded-[4px] h-8 px-2 font-medium text-[14px] leading-5 text-[#778588]">
                    20
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button type="button" aria-label="Previous page" className="flex items-center p-2 rounded-[8px]">
                  <img src={`${ICON}/chevron-left.svg`} alt="" className="w-5 h-5" />
                </button>
                <span className="text-[14px] leading-[1.2] text-[#2a3440]">Page</span>
                <span className="flex items-center justify-center bg-white border border-[#c7cfce] rounded-[8px] h-9 w-12 text-[14px] leading-[1.2] text-[#202227]">
                  1
                </span>
                <span className="text-[14px] leading-[1.2] text-[#2a3440]">out of 1</span>
                <button type="button" aria-label="Next page" className="flex items-center p-2 rounded-[8px]">
                  <img src={`${ICON}/chevron-right.svg`} alt="" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
