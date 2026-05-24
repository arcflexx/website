import Hero from './components/Hero';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteContent } from '@/lib/cds';

const categoryTiles = [
  {
    title: 'Men',
    href: '/shop/men',
    image: 'https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=1200',
    alt: 'Men training apparel',
  },
  {
    title: 'Women',
    href: '/shop/women',
    image: 'https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=1200',
    alt: 'Women training apparel',
  },
  {
    title: 'Accessories',
    href: '/shop/accessories',
    image: 'https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=1200',
    alt: 'Athletic accessories',
  },
];

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="w-full">
      {/* Hero Section */}
      <Hero hero={content.home.hero} />

      <section className="w-full bg-white px-5 py-20 sm:px-8 md:py-24 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
            <h2 className="text-4xl font-bold text-black md:text-5xl">Shop by Category</h2>
            <p className="max-w-xl text-base font-light leading-relaxed text-black/60 md:text-lg">
              Choose the collection that fits your training day.
            </p>
          </div>

          <div className="mx-auto flex justify-center">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 w-full">
              {categoryTiles.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group relative flex min-h-[420px] overflow-hidden bg-gray-100 md:min-h-[520px]"
              >
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                <div className="relative mt-auto w-full p-7 text-white md:p-8">
                  <h3 className="text-4xl font-bold md:text-5xl">{category.title}</h3>
                  <span className="mt-5 inline-flex border border-white/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-colors group-hover:bg-white group-hover:text-black">
                    Shop Now
                  </span>
                </div>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
