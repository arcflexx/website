type PlaceholderProduct = {
  id: string | number;
  title: string;
  status?: string;
};

type PlaceholderProductGridProps = {
  items: PlaceholderProduct[];
};

export default function PlaceholderProductGrid({ items }: PlaceholderProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.id} className="group cursor-pointer border-b border-r border-black/10">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 transition-transform duration-300 group-hover:scale-[1.02]">
              <span className="px-4 text-center text-sm text-gray-500">{item.title}</span>
            </div>
          </div>
          <div className="px-4 py-4">
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-black/45">{item.status ?? 'Coming Soon'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
