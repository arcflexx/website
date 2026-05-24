'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const shopLinks = [
  { href: '/shop/men', label: 'Men' },
  { href: '/shop/women', label: 'Women' },
  { href: '/shop/accessories', label: 'Accessories' },
];

const languageOptions = [
  {
    region: 'US',
    language: 'English',
    locale: 'en',
    nav: { shop: 'Shop', gallery: 'Gallery', about: 'About Us', account: 'Account' },
  },
  {
    region: 'ES',
    language: 'Espanol',
    locale: 'es',
    nav: { shop: 'Tienda', gallery: 'Galeria', about: 'Nosotros', account: 'Cuenta' },
  },
  {
    region: 'FR',
    language: 'Francais',
    locale: 'fr',
    nav: { shop: 'Boutique', gallery: 'Galerie', about: 'A Propos', account: 'Compte' },
  },
  {
    region: 'DE',
    language: 'Deutsch',
    locale: 'de',
    nav: { shop: 'Shop', gallery: 'Galerie', about: 'Uber Uns', account: 'Konto' },
  },
];

const accountCopy = {
  en: {
    title: 'Account',
    description: 'Sign in to your Arcflex Athletics account to manage orders, preferences, and account information.',
    signIn: 'Sign In',
    create: 'Create Account',
  },
  es: {
    title: 'Cuenta',
    description: 'Inicia sesion en Arcflex Athletics para gestionar pedidos, preferencias e informacion de la cuenta.',
    signIn: 'Iniciar Sesion',
    create: 'Crear Cuenta',
  },
  fr: {
    title: 'Compte',
    description: 'Connectez-vous a votre compte Arcflex Athletics pour gerer vos commandes et preferences.',
    signIn: 'Connexion',
    create: 'Creer un Compte',
  },
  de: {
    title: 'Konto',
    description: 'Melde dich bei Arcflex Athletics an, um Bestellungen, Einstellungen und Kontoinformationen zu verwalten.',
    signIn: 'Anmelden',
    create: 'Konto Erstellen',
  },
};

type LocaleKey = keyof typeof accountCopy;

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(() => {
    if (typeof window === 'undefined') {
      return 'US';
    }

    const savedRegion = window.localStorage.getItem('arcflex-region');
    return savedRegion && languageOptions.some((option) => option.region === savedRegion) ? savedRegion : 'US';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedLanguage = languageOptions.find((option) => option.region === selectedRegion) ?? languageOptions[0];
  const locale = selectedLanguage.locale as LocaleKey;
  const copy = accountCopy[locale];
  const isHomePage = pathname === '/';
  const shouldUseLightNav = !isHomePage || isScrolled || isMenuOpen || isAccountOpen;
  const navClassName = shouldUseLightNav ? 'bg-white border-b border-black/10 shadow-sm' : 'bg-transparent border-b border-transparent';
  const textClassName = shouldUseLightNav ? 'text-black' : 'text-white';
  const dropdownClassName = 'bg-white text-black border border-black/10';
  const logoSrc = shouldUseLightNav ? '/logo_black.png' : '/logo_white.png';

  useEffect(() => {
    document.documentElement.lang = selectedLanguage.locale;
    document.documentElement.dataset.region = selectedLanguage.region;
    document.documentElement.dataset.language = selectedLanguage.language;
  }, [selectedLanguage]);

  const updateLanguage = (region: string) => {
    const option = languageOptions.find((item) => item.region === region) ?? languageOptions[0];
    setSelectedRegion(option.region);
    window.localStorage.setItem('arcflex-region', option.region);
  };

  const closePanels = () => {
    setIsMenuOpen(false);
    setIsAccountOpen(false);
  };

  const openAccount = () => {
    setIsMenuOpen(false);
    setIsAccountOpen(true);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${navClassName}`}>
      <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16 py-4 sm:py-5">
        <div className={`grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-sm font-light ${textClassName}`}>
          <div className="flex items-center justify-self-start">
            <button
              type="button"
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center border border-current/25 transition-colors hover:bg-current/10"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="flex w-5 flex-col gap-1.5">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-7 xl:gap-11">
              <div className="relative group">
                <button type="button" className="uppercase tracking-[0.22em] hover:opacity-70 transition-opacity px-3 py-3">
                  {selectedLanguage.nav.shop}
                </button>
                <div className={`absolute left-0 top-full mt-3 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 shadow-2xl ${dropdownClassName}`}>
                  {shopLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="block px-5 py-4 text-base font-light transition-colors hover:bg-black/5">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/gallery" className="uppercase tracking-[0.22em] hover:opacity-70 transition-opacity px-3 py-3">
                {selectedLanguage.nav.gallery}
              </Link>
              <Link href="/about" className="uppercase tracking-[0.22em] hover:opacity-70 transition-opacity px-3 py-3">
                {selectedLanguage.nav.about}
              </Link>
            </div>
          </div>

          <div className="justify-self-center">
            <Link href="/" className="font-semibold text-xl tracking-[0.38em] hover:opacity-70 transition-opacity">
              <Image src={logoSrc} alt="ARCFLEX" width={75} height={75} />
            </Link>
          </div>

          <div className="flex items-center gap-4 sm:gap-7 xl:gap-10 justify-self-end">
            <button
              type="button"
              className="hidden sm:inline-block uppercase tracking-[0.22em] hover:opacity-70 transition-opacity px-3 py-3"
              onClick={openAccount}
            >
              {selectedLanguage.nav.account}
            </button>

            <div className="relative group">
              <button type="button" className="uppercase tracking-[0.22em] hover:opacity-70 transition-opacity px-3 py-3">
                {selectedRegion}
              </button>
              <div className={`absolute right-0 top-full mt-3 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-3 shadow-2xl ${dropdownClassName}`}>
                {languageOptions.map((option) => (
                  <button
                    key={option.region}
                    type="button"
                    className="block w-full px-4 py-3 text-left text-sm font-light transition-colors hover:bg-black/5"
                    onClick={() => updateLanguage(option.region)}
                  >
                    <span className="font-semibold">{option.region}</span>
                    <span className="ml-3 text-black/60">{option.language}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 bg-black/35 transition-opacity lg:hidden ${isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
      <aside className={`fixed left-0 top-0 z-50 h-dvh w-[min(86vw,360px)] bg-white text-black shadow-2xl transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <span className="text-xs font-semibold uppercase tracking-[0.28em]">Menu</span>
          <button type="button" className="h-10 w-10 border border-black/15 text-lg" aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
            x
          </button>
        </div>

        <div className="px-6 py-7">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-black/45">{selectedLanguage.nav.shop}</p>
          <div className="space-y-1 border-b border-black/10 pb-6">
            {shopLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block py-4 text-2xl font-semibold" onClick={closePanels}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-1 py-6">
            <Link href="/gallery" className="block py-4 text-2xl font-semibold" onClick={closePanels}>
              {selectedLanguage.nav.gallery}
            </Link>
            <Link href="/about" className="block py-4 text-2xl font-semibold" onClick={closePanels}>
              {selectedLanguage.nav.about}
            </Link>
            <button type="button" className="block w-full py-4 text-left text-2xl font-semibold" onClick={openAccount}>
              {selectedLanguage.nav.account}
            </button>
          </div>
        </div>
      </aside>

      <div className={`fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-5 pt-24 transition-opacity ${isAccountOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setIsAccountOpen(false)}>
        <div className="w-full max-w-md bg-white p-8 text-black shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="account-dialog-title" onClick={(event) => event.stopPropagation()}>
          <div className="mb-7 flex items-center justify-between">
            <h2 id="account-dialog-title" className="text-3xl font-bold">{copy.title}</h2>
            <button type="button" className="h-10 w-10 border border-black/15 text-lg" aria-label="Close account dialog" onClick={() => setIsAccountOpen(false)}>
              x
            </button>
          </div>
          <p className="mb-8 text-base font-light leading-relaxed text-black/65">{copy.description}</p>
          <div className="space-y-3">
            <button type="button" className="w-full bg-black px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-black/85">
              {copy.signIn}
            </button>
            <button type="button" className="w-full border border-black/15 px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-black/5">
              {copy.create}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
