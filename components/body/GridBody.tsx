'use client';

export default function GridBody() {
  const cards = [
    { id: 1, title: 'Card One' },
    { id: 2, title: 'Card Two' },
    { id: 3, title: 'Card Three' },
    { id: 4, title: 'Card Four' },
    { id: 5, title: 'Card Five' },
    { id: 6, title: 'Card Six' },
  ];

  return (
    <div className="p-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-40 flex items-center justify-center">
              <span className="text-slate-500 text-sm">Image placeholder</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 mb-2">{card.title}</h3>
              <p className="text-slate-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
