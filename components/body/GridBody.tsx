export default function GridBody() {
  const items = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Content Card ${i + 1}`,
    description: "Placeholder content identical across all navigation patterns.",
  }));

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-slate-400 text-sm font-medium">Image {item.id}</div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
