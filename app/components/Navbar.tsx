'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClassName = isScrolled
    ? 'bg-white border-b border-black/10 shadow-sm'
    : 'bg-transparent border-b border-transparent';
  const textClassName = isScrolled ? 'text-black' : 'text-white';
  const dropdownClassName = isScrolled
    ? 'bg-white text-black border border-black/10'
    : 'bg-white text-black border border-black/10';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${navClassName}`}>
      <div className="w-full px-6 md:px-10 lg:px-14 py-5 mx-4 md:mx-6 lg:mx-8">
        <div className={`grid grid-cols-[1fr_auto_1fr] items-center gap-6 text-sm font-light ${textClassName}`}>
          <div className="flex items-center gap-10 justify-self-start">
            <div className="relative group">
              <button className="uppercase tracking-[0.22em] hover:opacity-70 transition-opacity">
                Shop
              </button>
              <div className={`absolute left-0 top-full mt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-3 shadow-2xl ${dropdownClassName}`}>
                <Link
                  href="/shop/men"
                  className="block px-4 py-2 hover:bg-black/5 text-sm font-light"
                >
                  Men
                </Link>
                <Link
                  href="/shop/women"
                  className="block px-4 py-2 hover:bg-black/5 text-sm font-light"
                >
                  Women
                </Link>
                <Link
                  href="/shop/accessories"
                  className="block px-4 py-2 hover:bg-black/5 text-sm font-light"
                >
                  Accessories
                </Link>
              </div>
            </div>

            <Link href="/gallery" className="uppercase tracking-[0.22em] hover:opacity-70 transition-opacity">
              Gallery
            </Link>
            <Link href="/about" className="uppercase tracking-[0.22em] hover:opacity-70 transition-opacity">
              About Us
            </Link>
          </div>

          <div className="justify-self-center">
            <Link href="/" className="font-semibold text-xl tracking-[0.38em] hover:opacity-70 transition-opacity">
              {/* ARCFLEX */}
              {isScrolled ? (
              <Image src="/logo_black.png" alt="ARCFLEX" width={75} height={75} />
              ) : (
              <Image src="/logo_white.png" alt="ARCFLEX" width={75} height={75} />
              )}
            </Link>
          </div>

          <div className="flex items-center gap-10 justify-self-end">
            <Link href="/account" className="uppercase tracking-[0.22em] hover:opacity-70 transition-opacity">
              Account
            </Link>

            <div className="relative group">
              <button className="uppercase tracking-[0.22em] hover:opacity-70 transition-opacity">
                US
              </button>
              <div className={`absolute right-0 top-full mt-4 w-24 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-3 shadow-2xl ${dropdownClassName}`}>
                <button className="block w-full text-left px-4 py-2 hover:bg-black/5 text-sm font-light">
                  US
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-black/5 text-sm font-light">
                  UK
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-black/5 text-sm font-light">
                  EU
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-black/5 text-sm font-light">
                  CA
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-black/5 text-sm font-light">
                  AU
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
