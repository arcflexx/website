import Image from 'next/image';
import PageShell from '../components/PageShell';
import { getSiteContent } from '@/lib/cds';

export default async function GalleryPage() {
  const content = await getSiteContent();

  return (
    <PageShell
      title={content.gallery.heading}
      description={content.gallery.description}
      contentClassName="mt-16"
    >
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
    </PageShell>
  );
}
