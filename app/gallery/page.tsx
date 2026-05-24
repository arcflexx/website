import Image from 'next/image';
import { getSiteContent } from '@/lib/cds';

export default async function GalleryPage() {
  const content = await getSiteContent();

  return (
    <main className="w-full pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-28">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
          {content.gallery.heading}
        </h1>
        <p className="text-lg text-black/60 font-light mb-16 leading-relaxed max-w-2xl">
          {content.gallery.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.gallery.images.map((item) => (
            <div
              key={item.title}
              className="aspect-square bg-gray-100 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
            >
              <Image
                src={item.image.url}
                alt={item.image.altText}
                className="w-full h-full object-cover"
                width={800}
                height={800}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
