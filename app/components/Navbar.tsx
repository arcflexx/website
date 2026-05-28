'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll(); // Check scroll position on mount
    
    window.addEventListener('scroll', handleScroll);
    return () => {
    window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center max-w-7xl mx-auto px-5 py-0">
        {/* Left: links on md+, menu button on small screens */}
        <div className="flex items-center">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className={`text-sm font-medium ${pathname === '/products' ? 'text-blue-600' : `${isScrolled ? 'text-black' : 'text-white hover:text-stone-950'}`}`}>
              SHOP
            </Link>
            <Link href="/about" className={`text-sm font-medium ${pathname === '/about' ? 'text-blue-600' : `${isScrolled ? 'text-black' : 'text-white hover:text-stone-950'}`}`}>
              ABOUT US
            </Link>
          </div>

          <button
            className={`md:hidden flex items-center gap-1 ${isScrolled ? 'text-black' : 'text-white hover:text-stone-950'} focus:outline-none`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
              <Link href="/" className={`block px-4 py-2 text-sm font-medium ${pathname === '/' ? 'text-blue-600' : `${isScrolled ? 'text-black' : 'text-white hover:text-stone-950'}`}`}>
                HOME
              </Link>
              <Link href="/products" className={`block px-4 py-2 text-sm font-medium ${pathname === '/products' ? 'text-blue-600' : `${isScrolled ? 'text-black' : 'text-white hover:text-stone-950'}`}`}>
                SHOP
              </Link>
              <Link href="/about" className={`block px-4 py-2 text-sm font-medium ${pathname === '/about' ? 'text-blue-600' : `${isScrolled ? 'text-black' : 'text-white hover:text-stone-950'}`}`}>
                ABOUT US
              </Link>
            </div>
          )}
        </div>

        {/* Center: logo */}
        <Link href="/" className="flex justify-center">
        {isScrolled ? (
          <Image src="/logo_black.png" alt="Logo" width={75} height={75} loading="eager" />
        ) : (
          <Image src="/logo_white.png" alt="Logo" width={75} height={75} loading="eager" />
        )}
        </Link>

        {/* Right: account dropdown */}
        <div className="flex justify-end items-center relative">
          <button
            className={`flex items-center gap-2 text-sm ${isScrolled ? 'text-black' : 'text-white hover:text-gray-500'} focus:outline-none`}
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            aria-label="Account"
          >
            <span className="hidden sm:inline">ACCOUNT</span>
          </button>

          {isAccountOpen && (
            <div className={`absolute top-11 right-0 mt-2 w-48 text-right transition-colors duration-300 bg-white shadow-lg text-black'}`}>
              <Link href="/account" className={`block px-4 py-1.5 text-sm hover:text-white hover:bg-gray-400`}>Profile</Link>
              <Link href="/settings" className={`block px-4 py-1.5 text-sm hover:text-white hover:bg-gray-400`}>Settings</Link>
              <Link href="/logout" className={`block px-4 py-1.5 text-sm hover:text-white hover:bg-gray-400`}>Logout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
