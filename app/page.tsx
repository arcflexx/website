import Hero from './components/Hero';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Featured Section */}
      <section className="flex w-full bg-white py-20 px-6 md:px-12 lg:px-20 justify-center my-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-black">
              Featured Collection
            </h2>
            <p className="text-lg text-black/70 font-light mx-auto">
              Discover our handpicked selection of premium athletic wear designed for performance and style.
            </p>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {/* Product Card 1 */}
            <div className="group cursor-pointer">
              <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  {/* <span className="text-gray-500">Product Image</span> */}
                  <Image
                    src="https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=750"
                    alt="Premium Running Top"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={800}
                    height={800}
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Essential Compression Shirt</h3>
              <p className="text-black/60 text-sm mb-3 font-light">
                Designed to enhance blood flow and reduce muscle fatigue.
              </p>
              <p className="font-semibold">$89.99</p>
            </div>

            {/* Product Card 2 */}
            <div className="group cursor-pointer">
              <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  {/* <span className="text-gray-500">Product Image</span> */}
                  <Image
                    src="https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=750"
                    alt="Premium Running Top"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={800}
                    height={800}
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Essential Compression Shirt</h3>
              <p className="text-black/60 text-sm mb-3 font-light">
                Designed to enhance blood flow and reduce muscle fatigue.
              </p>
              <p className="font-semibold">$89.99</p>
            </div>

            {/* Product Card 3 */}
            <div className="group cursor-pointer">
              <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  {/* <span className="text-gray-500">Product Image</span> */}
                  <Image
                    src="https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=750"
                    alt="Premium Running Top"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={800}
                    height={800}
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Athletic Shorts</h3>
              <p className="text-black/60 text-sm mb-3 font-light">
                Lightweight and durable for all your sports activities.
              </p>
              <p className="font-semibold">$69.99</p>
            </div>

            {/* Product Card 4 */}
            <div className="group cursor-pointer">
              <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  {/* <span className="text-gray-500">Product Image</span> */}
                  <Image
                    src="https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=750"
                    alt="Premium Running Top"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={800}
                    height={800}
                  />
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
