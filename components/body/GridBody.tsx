export default function GridBody() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4">
        <p className="text-[14px] text-[#1A7BD9]">
          <span>Basic Information </span>
          <span className="text-[#2A3440]">/ </span>
          <span className="font-bold text-[#1A7BD9]">Property 1</span>
        </p>
        <h1 className="font-bold text-[32px] leading-[1.2] text-[#101828]">Property 1</h1>
      </div>
      <div className="bg-white border border-[#E9ECEE] rounded-lg h-[483px] w-full" />
    </div>
  );
}
