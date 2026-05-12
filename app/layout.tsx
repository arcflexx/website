import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Arcflex Athletics - Premium Athletic Performance Wear",
  description: "Premium athletic performance wear designed for excellence. Explore our collection of high-quality activewear and athletic apparel.",
  keywords: "athletic wear, activewear, performance wear, sports apparel, gym wear",
  openGraph: {
    title: "Arcflex Athletics",
    description: "Premium Athletic Performance Wear",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-black font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
