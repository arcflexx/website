'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/lib/products';

interface ImageDisplayProps {
  images: ProductImage[];
}

export default function ImageDisplay({ images }: ImageDisplayProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const validImages = images?.filter((image) => image.url && image.url.trim().length > 0) ?? [];

  if (validImages.length === 0) {
    return (
      <div className="bg-gray-100 rounded-none w-full h-96 flex items-center justify-center">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  const mainImage = validImages[Math.min(selectedIndex, validImages.length - 1)];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Display */}
      <div className="relative bg-gray-100 rounded-none overflow-hidden w-full aspect-square">
        <Image
          src={mainImage.url}
          alt={`Product image ${selectedIndex + 1}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Scrollable Preview Images */}
      {validImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative shrink-0 w-20 h-20 rounded-none overflow-hidden border-none transition-colors`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.url}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
