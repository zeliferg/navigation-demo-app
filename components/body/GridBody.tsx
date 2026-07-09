const containers = [
  { id: "container-1", title: "Container 1" },
  { id: "container-2", title: "Container 2" },
];

export default function GridBody() {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full items-start">
      {containers.map((container) => (
        <div
          key={container.id}
          className="bg-white border border-[#E0E0E0] rounded-xl p-4 flex flex-col gap-[10px] w-full md:flex-1"
        >
          <div className="flex items-center justify-between">
            <p className="font-medium text-[18px] leading-[1.334] text-[#121826]">{container.title}</p>
            <img src="/body/refresh.svg" alt="" className="w-6 h-6" />
          </div>
          <div className="bg-white border border-[#E0E0E0] rounded-xl px-3 py-2 flex items-center justify-between w-full">
            <p className="font-medium text-[16px] tracking-[0.17px] text-[#121826]">Item 1</p>
            <div className="flex items-center gap-2">
              <div className="bg-[#3DA441] rounded-full h-6 px-2 flex items-center gap-1">
                <img src="/body/check-circle.svg" alt="" className="w-[14px] h-[14px]" />
                <span className="text-[14px] text-white leading-4">Success</span>
              </div>
              <img src="/body/chevron-down.svg" alt="" className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
