import Hero from './components/Hero';

export default function Home() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Featured Section */}
      <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-black">
              Featured Collection
            </h2>
            <p className="text-lg text-black/70 font-light max-w-2xl mx-auto">
              Discover our handpicked selection of premium athletic wear designed for performance and style.
            </p>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="group cursor-pointer">
              <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Running Top</h3>
              <p className="text-black/60 text-sm mb-3 font-light">
                High-performance fabric for ultimate comfort during your runs.
              </p>
              <p className="font-semibold">$89.99</p>
            </div>

            {/* Product Card 2 */}
            <div className="group cursor-pointer">
              <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Performance Leggings</h3>
              <p className="text-black/60 text-sm mb-3 font-light">
                Engineered for maximum flexibility and breathability.
              </p>
              <p className="font-semibold">$119.99</p>
            </div>

            {/* Product Card 3 */}
            <div className="group cursor-pointer">
              <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Athletic Shorts</h3>
              <p className="text-black/60 text-sm mb-3 font-light">
                Lightweight and durable for all your sports activities.
              </p>
              <p className="font-semibold">$69.99</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <button className="px-12 py-3 bg-black text-white font-semibold text-sm tracking-widest hover:bg-black/90 transition-all duration-300">
              VIEW ALL PRODUCTS
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
