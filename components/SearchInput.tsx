'use client';

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({
  placeholder = 'Search by Name, Plate, Year, Make, Model, or Color',
}: SearchInputProps) {
  return (
    <div className="bg-white border border-[#E9ECEE] rounded-lg overflow-hidden flex items-center gap-3 px-4 py-3" style={{ height: '37px' }}>
      <svg
        className="flex-shrink-0"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#778588"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm font-normal text-[#778588] placeholder-[#778588] focus:outline-none"
        style={{
          fontFamily: 'Mulish, system-ui, sans-serif',
          fontSize: '14px',
          lineHeight: '1.2',
        }}
      />
    </div>
  );
}
