// Pattern C content area, pulled from Figma node 70:28741 ("Pattern C" - Insights table).
// Used in place of the shared GridBody for Pattern C only. The source's fixed 1066px/508px
// column widths are replaced with responsive flex sizing.

const ICON = "/nav-patterns/pattern-c";

// Illustrative row icons: white glyph on a brand-colored circle (colors from the pulled
// IllustrativeIcon variants). Statement text is generic B2B-analytics copy (not client-
// identifying); the internal icon "subject" names aren't shown.
interface InsightRow {
  glyph: string;
  color: string;
  date: string;
  statement: string;
  type: string;
}

const rows: InsightRow[] = [
  {
    glyph: "ins-funnel.png",
    color: "#69E2AE",
    date: "04/11/2023",
    statement:
      "You are currently behind last quarter's MQL production by 28% Sed ultricies hendrerit imperdiet. Curabitur sit amet efficitur ex.",
    type: "MQL Production",
  },
  {
    glyph: "ins-health.png",
    color: "#FF3399",
    date: "04/11/2023",
    statement:
      "3 of your campaigns have significantly decreased over the last month Sed ultricies hendrerit imperdiet. Curabitur sit amet efficitur ex.",
    type: "Campaigns Impacting Opportunity Creation",
  },
  {
    glyph: "ins-attribution.png",
    color: "#9165F7",
    date: "04/11/2023",
    statement:
      "Your total marketing attribution is ahead of last quarter by 7% Sed ultricies hendrerit imperdiet. Curabitur sit amet efficitur ex.",
    type: "Marketing Attribution",
  },
  {
    glyph: "ins-surge.png",
    color: "#22D8F1",
    date: "04/11/2023",
    statement: "The number of highly engaged accounts is down by 14% from last quarter",
    type: "Engaged Accounts",
  },
  {
    glyph: "ins-surge.png",
    color: "#22D8F1",
    date: "04/11/2023",
    statement:
      "The number of highly engaged accounts is up by 18% from last quarter Sed ultricies hendrerit imperdiet. Curabitur sit amet efficitur ex.",
    type: "Engaged Accounts",
  },
];

export default function PatternCContent() {
  return (
    <div className="bg-white shadow-[0px_0px_1.5px_0px_rgba(0,0,0,0.15)] rounded-[4px] p-4 w-full">
      {/* Table header */}
      <div className="flex items-center justify-between pl-4 pr-2">
        <p className="text-[16px] leading-[18px] tracking-[-0.23px] text-black">Insights</p>
        <button
          type="button"
          aria-label="View all insights"
          className="flex items-center justify-center p-1.5 rounded-full"
        >
          <img src={`${ICON}/arrow-right-circle.svg`} alt="" className="w-6 h-6" />
        </button>
      </div>

      {/* Column headers */}
      <div className="flex items-center gap-4 bg-[rgba(105,226,174,0.08)] pl-4 py-0.5 mt-2">
        <div className="w-[150px] shrink-0 px-4 py-1.5 text-[14px] leading-4 tracking-[-0.23px] text-[#001022]">
          Date
        </div>
        <div className="flex-[2] min-w-0 px-4 py-1.5 text-[14px] leading-4 tracking-[-0.23px] text-[#001022]">
          Statement
        </div>
        <div className="flex-1 min-w-0 px-4 py-1.5 text-[14px] leading-4 tracking-[-0.23px] text-[#001022]">Type</div>
        <div className="w-11 shrink-0" />
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-4 pl-4 py-1 border-t border-[#f0f0f0] first:border-t-0">
            <div className="w-[150px] shrink-0 flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: row.color }}
              >
                <img src={`${ICON}/${row.glyph}`} alt="" className="w-[18px] h-[18px] object-contain" />
              </span>
              <span className="font-mono text-[14px] leading-4 tracking-[-0.23px] text-[rgba(0,16,34,0.67)] whitespace-nowrap">
                {row.date}
              </span>
            </div>

            <div className="flex-[2] min-w-0 px-4 py-4">
              <p className="text-[16px] leading-[1.2] tracking-[-0.23px] text-[rgba(0,0,0,0.87)] line-clamp-2">
                {row.statement}
              </p>
            </div>

            <div className="flex-1 min-w-0 px-4 py-4">
              <p className="text-[16px] leading-4 tracking-[-0.23px] text-[rgba(0,0,0,0.87)] truncate">{row.type}</p>
            </div>

            <button
              type="button"
              aria-label="Row actions"
              className="w-11 shrink-0 flex items-center justify-center py-1.5"
            >
              <img src={`${ICON}/more-vertical.svg`} alt="" className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
