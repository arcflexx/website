import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import { CartWrapper } from "./providers/CartProvider";
import { ShopifyWrapper } from "./providers/ShopifyProvider";

export const texheros = localFont({
  src: '../public/fonts/texheros.otf',
  variable: '--font-texheros',
});

export const inter = localFont({
  src: '../public/fonts/inter-variable.ttf',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Arcflex",
  description: "A premium athletic wear brand."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <ShopifyWrapper>
          <CartWrapper>
            {children}
          </CartWrapper>
        </ShopifyWrapper>
      </body>
    </html>
  );
}
