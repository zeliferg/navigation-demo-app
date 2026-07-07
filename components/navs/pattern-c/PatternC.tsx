interface PatternCProps {
  children?: React.ReactNode;
}

export default function PatternC({ children }: PatternCProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-slate-100 border-b border-slate-300 p-4">
        <div className="flex items-center justify-center h-16 rounded bg-slate-200">
          <span className="text-slate-600 font-semibold">Pattern C Navigation</span>
        </div>
      </nav>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
