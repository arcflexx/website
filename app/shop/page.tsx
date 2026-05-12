export default function ShopPage() {
  return (
    <main className="w-full pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
          Shop
        </h1>
        <p className="text-lg text-black/60 font-light mb-12">
          Browse our complete collection of athletic wear and performance gear.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Placeholder products */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Product {i}</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold mb-2">Product {i}</h3>
              <p className="font-semibold text-sm">Coming Soon</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
