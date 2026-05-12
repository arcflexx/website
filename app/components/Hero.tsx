'use client';

export default function Hero() {
  const videoSource = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

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
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          {/* Main Heading */}
          <h1 className="text-7xl md:text-8xl font-bold text-white tracking-wider">
            ARCFLEX
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-2xl text-white/90 font-light tracking-wide max-w-2xl mx-auto">
            Premium Athletic Performance Wear
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <button className="px-10 py-3 bg-white text-black font-semibold text-sm tracking-widest hover:bg-white/90 transition-all duration-300 hover:scale-105">
              EXPLORE COLLECTION
            </button>
          </div>
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
