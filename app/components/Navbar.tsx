'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import CartButton from './CartButton';

export default function Navbar({ startTransparent = true }: { startTransparent?: boolean }) {
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
    <nav className={`fixed top-0 left-0 w-full z-50 font-normal text-sm transition-colors duration-300 ${!startTransparent || isScrolled ? 'bg-white shadow-sm text-black' : 'bg-transparent text-white'}`}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center max-w-7xl mx-auto px-5 py-0">
        {/* Left: links on md+, menu button on small screens */}
        <div className="flex items-center">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/shop">
              SHOP
            </Link>
            <Link href="/about">
              ABOUT US
            </Link>
          </div>

          <button
            className={`md:hidden flex items-center gap-1 focus:outline-none`}
            onClick={() => {setIsOpen(!isOpen); setIsAccountOpen(false);}}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <div
            className={`absolute top-full left-0 w-full bg-white shadow-md md:hidden text-black overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <Link href="/shop" className={`block px-4 py-2`}>
              SHOP
            </Link>
            <Link href="/about" className={`block px-4 py-2`}>
              ABOUT US
            </Link>
          </div>
        </div>

        {/* Center: logo */}
        <Link href="/" className="flex justify-center">
        {!startTransparent || isScrolled ? (
          <Image src="/logo_black.png" alt="Logo" width={75} height={75} loading="eager" />
        ) : (
          <Image src="/logo_white.png" alt="Logo" width={75} height={75} loading="eager" />
        )}
        </Link>

        {/* Right: account dropdown */}
        {/*<div className="flex justify-end items-center relative">
          <button
            className={`flex items-center gap-2 focus:outline-none`}
            onClick={() => {
              setIsAccountOpen(!isAccountOpen);
              setIsOpen(false);
            }}
            aria-label="Account"
          >
            <span className="hidden sm:inline cursor-pointer">ACCOUNT</span>
          </button>
        </div>

        <div
          className={`absolute top-full right-5 w-75 bg-white shadow-md text-black overflow-hidden transition-all duration-300 ease-in-out ${
            isAccountOpen ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <Link href="/account" className={`block px-4 py-1.5`}>Profile</Link>
          <Link href="/settings" className={`block px-4 py-1.5`}>Settings</Link>
          <Link href="/logout" className={`block px-4 py-1.5`}>Logout</Link>
        </div>*/}
      </div>
    </nav>
  );
}
