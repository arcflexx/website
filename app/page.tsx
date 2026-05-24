import Hero from './components/Hero';
import Image from 'next/image';
import { getSiteContent } from '@/lib/cds';

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="w-full">
      {/* Hero Section */}
      <Hero hero={content.home.hero} />

      {/* Featured Section */}
      <section className="w-full bg-white py-28 px-6 md:px-10 lg:px-14 my-1">
        <div className="w-full">
          <div className="text-center space-y-8 mb-20 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-black">
              {content.home.featuredSection.heading}
            </h2>
            <p className="text-lg md:text-xl text-black/70 font-light mx-auto leading-relaxed">
              {content.home.featuredSection.description}
            </p>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10">
            {content.home.featuredSection.cards.map((card) => (
              <div key={card.id} className="group cursor-pointer">
                <div className="bg-gray-100 aspect-square mb-6 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Image
                      src={card.image.url}
                      alt={card.image.altText}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={800}
                      height={800}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-center">{card.title}</h3>
                <p className="text-black/60 text-sm mb-4 font-light leading-relaxed text-center">
                  {card.description}
                </p>
                <p className="font-semibold">{card.priceLabel}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-20">
            <button className="px-12 py-3 bg-black text-white font-semibold text-sm tracking-widest hover:bg-black/90 transition-all duration-300">
              VIEW ALL PRODUCTS
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
