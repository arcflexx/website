'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        // Scrolling UP
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN (and past initial area)
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Transparent background */}
      <div className="bg-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Navigation */}
            <div className="flex items-center gap-8 text-white text-sm font-light">
              <div className="relative group">
                <button className="hover:opacity-70 transition-opacity">Shop</button>
                {/* Shop Dropdown */}
                <div className="absolute left-0 mt-0 w-48 bg-black/90 backdrop-blur-sm text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-4 pb-2">
                  <Link
                    href="/shop/men"
                    className="block px-4 py-2 hover:bg-white/10 text-sm font-light"
                  >
                    Men
                  </Link>
                  <Link
                    href="/shop/women"
                    className="block px-4 py-2 hover:bg-white/10 text-sm font-light"
                  >
                    Women
                  </Link>
                  <Link
                    href="/shop/accessories"
                    className="block px-4 py-2 hover:bg-white/10 text-sm font-light"
                  >
                    Accessories
                  </Link>
                </div>
              </div>

              <Link href="/gallery" className="hover:opacity-70 transition-opacity">
                Gallery
              </Link>
              <Link href="/about" className="hover:opacity-70 transition-opacity">
                About Us
              </Link>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="text-white font-bold text-xl tracking-widest hover:opacity-70 transition-opacity">
                ARCFLEX
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-8 text-white text-sm font-light">
              <Link href="/account" className="hover:opacity-70 transition-opacity">
                Account
              </Link>

              {/* Region Dropdown */}
              <div className="relative group">
                <button className="hover:opacity-70 transition-opacity">US</button>
                <div className="absolute right-0 mt-0 w-24 bg-black/90 backdrop-blur-sm text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-4 pb-2">
                  <button className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm font-light">
                    US
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm font-light">
                    UK
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm font-light">
                    EU
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm font-light">
                    CA
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm font-light">
                    AU
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
