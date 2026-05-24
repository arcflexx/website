'use client';

import type { HomeContent } from '@/lib/cds';
import Image from 'next/image';

interface HeroProps {
  hero: HomeContent['hero'];
}

export default function Hero({ hero }: HeroProps) {
  const videoSource = hero.videoUrl;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      {videoSource ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSource} type="video/mp4" />
          {/* Fallback gradient if video doesn't load */}
          <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        </video>
      ) : (
        /* Fallback Gradient */
        // <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <Image src="/front_image.jpeg" alt="Hero Image" fill className="object-cover" />
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative h-full">
        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center text-center px-6">
          <p className="text-lg md:text-2xl text-white/90 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            {hero.heading}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
