import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';

export const texheros = localFont({
  src: '../public/fonts/font.otf',
  variable: '--font-texheros',
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
      <body className={texheros.variable}>{children}</body>
    </html>
  );
}
