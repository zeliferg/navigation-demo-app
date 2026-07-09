export default function PatternB({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-slate-900">Pattern B</h2>
        <p className="text-sm text-slate-600 mt-2">Navigation pattern placeholder</p>
      </div>
      {children}
    </div>
  );
}
