import { ArrowRight, PackageSearch, ShoppingCart, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";
import { getCategories, listProducts } from "@/lib/products";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  const products = listProducts();
  const featuredProducts = listProducts({ featured: true });
  const categories = getCategories();

  return (
    <main className="min-h-screen bg-[#f7f6f2] text-stone-950">
      {/* <header className="border-b border-stone-200 bg-white/80 px-5 py-4 backdrop-blur sm:px-8 lg:px-12">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-normal">
            Arcflex Commerce
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/api/products"
              className="hidden rounded-md border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 hover:border-stone-500 sm:inline-flex"
            >
              API
            </Link>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-md bg-stone-950 text-white hover:bg-stone-800"
              aria-label="Cart"
            >
              <ShoppingCart aria-hidden="true" size={19} />
            </button>
          </div>
        </nav>
      </header> */}
      <Navbar startTransparent={true} />
      <Hero videoURL="" />

      <section className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-normal sm:text-6xl">
              Cleaned ARCFLEX Storefront.
            </h1>
          </div>

          <div className="grid gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <SlidersHorizontal aria-hidden="true" size={16} />
              Raw API Routes
            </div>
            <ApiLink href="/api/products" label="GET /api/products" />
            <ApiLink href="/api/products?featured=true" label="GET /api/products?featured=true" />
            <ApiLink href="/api/products?category=bags" label="GET /api/products?category=bags" />
            <ApiLink href="/api/products/aero-daypack" label="GET /api/products/aero-daypack" />
          </div>
        </div>
      </section>
    </main>
  );
}

type ApiLinkProps = {
  href: string;
  label: string;
};

function ApiLink({ href, label }: ApiLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-3 rounded-md bg-stone-100 px-3 py-2 font-mono text-sm text-stone-700 hover:bg-stone-200"
    >
      <span className="truncate">{label}</span>
      <ArrowRight aria-hidden="true" size={15} />
    </Link>
  );
}

type ProductCardProps = {
  product: ReturnType<typeof listProducts>[number];
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
      <Link href={`/products/${product.slug}`} className="block">
        <div
          className="aspect-[4/3] bg-cover bg-center"
          style={{ backgroundImage: `url(${product.image})` }}
          aria-label={product.name}
        />
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm text-stone-600">
          <span className="capitalize">{product.category}</span>
          <span className="inline-flex items-center gap-1">
            <Star aria-hidden="true" size={15} className="fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
        </div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-stone-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: product.currency
            }).format(product.price)}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 rounded-md bg-stone-950 px-3 py-2 text-sm font-medium text-white hover:bg-stone-800"
          >
            View
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
