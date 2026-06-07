import { ArrowRight, PackageSearch, ShoppingCart, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";
import { Category, getCategories, listProducts } from "@/lib/products";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function ShopPage() {
	const products = listProducts();
	const featuredProducts = listProducts({ featured: true });
	const categories = getCategories();

	return (
		<main className="min-h-screen bg-[#f7f6f2] text-stone-950">
			<Navbar startTransparent={false} />

			<section className="px-5 py-10 sm:px-8 lg:px-12 mt-16">
                <h1 className="text-4xl font-bold">SHOP ARCFLEX</h1>
			</section>

			<section id="categories" className="px-5 pb-6 sm:px-8 lg:px-12">
				<div className="mx-auto max-w-7xl">
					<div className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-700">
						<SlidersHorizontal aria-hidden="true" size={16} />
						Shop by category
					</div>
					<div className="flex flex-wrap gap-2">
						{categories.map((category) => (
							<Link
								key={category.id}
								href={`/api/products?category=${category.id}`}
								className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium capitalize text-stone-700 hover:border-stone-500"
							>
								{category.name}
							</Link>
						))}
					</div>
				</div>
			</section>

			<section id="featured" className="px-5 pb-14 sm:px-8 lg:px-12">
				<div className="mx-auto max-w-7xl">
					<div className="mb-5 flex items-center justify-between gap-4">
						<div>
							<h2 className="text-2xl font-semibold">Featured</h2>
							<p className="mt-1 text-sm text-stone-600">A tighter edit of the strongest pieces in the catalog.</p>
						</div>
						<Link href="/api/products?featured=true" className="text-sm font-medium text-stone-600 hover:text-stone-950">
							View JSON
						</Link>
					</div>
					<div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
						{featuredProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</section>

			{/* <section id="all-products" className="border-t border-stone-200 bg-white px-5 py-12 sm:px-8 lg:px-12">
				<div className="mx-auto max-w-7xl">
					<div className="mb-5 flex items-center justify-between gap-4">
						<div>
							<h2 className="text-2xl font-semibold">All products</h2>
							<p className="mt-1 text-sm text-stone-600">The full range, ready for deeper browsing and comparison.</p>
						</div>
						<div className="hidden items-center gap-2 text-sm text-stone-500 sm:flex">
							<ShoppingCart aria-hidden="true" size={16} />
							Basket-ready catalog
						</div>
					</div>
					<div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</section> */}

            <section id="catogories" className="px-5 py-10 sm:px-8 lg:px-12">
                <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
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

type CategoryCardProps = {
    category: Category;
};

function CategoryCard({ category }: CategoryCardProps) {
    return (
        <article className="overflow-hidden rounded-none bg-white shadow-none transition-shadow duration-300 hover:shadow-md">
            <Link href={`/api/products?category=${category.id}`} className="block">
                <div
                    className="aspect-[4/5] bg-cover bg-center"
                    style={{ backgroundImage: `url(${category.image})` }}
                    aria-label={category.name}
                />
            </Link>
            <div className="p-4">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">Discover our curated selection of {category.name.toLowerCase()} designed to elevate your style and functionality.</p>
                <div className="mt-4 flex items-center justify-end gap-3">
                    <Link
                        href={`/api/products?category=${category.id}`}
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

type ProductCardProps = {
	product: ReturnType<typeof listProducts>[number];
};

function ProductCard({ product }: ProductCardProps) {
	return (
		<article className="overflow-hidden rounded-none bg-white shadow-none transition-shadow duration-300 hover:shadow-lg">
			<Link href={`/shop/${product.slug}`} className="block">
				<div
					className="aspect-[4/5] bg-cover bg-center"
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
						href={`/shop/${product.slug}`}
						className="inline-flex items-center gap-1 rounded-none bg-stone-950 px-3 py-2 text-sm font-medium text-white hover:bg-stone-800"
					>
						View
						<ArrowRight aria-hidden="true" size={15} />
					</Link>
				</div>
			</div>
		</article>
	);
}
