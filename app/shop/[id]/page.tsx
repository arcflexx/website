'use client';

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, Package, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import ImageDisplay from "@/app/components/product/ImageDisplay";
import { private_createTypography } from "@mui/material";

type ProductApiResponse = {
	data?: Product;
	error?: string;
};

function formatAmount(amount: string) {
	if (typeof amount !== "string") return String(amount);
	if (!amount.includes(".")) return amount;
	const [intPart, decPart] = amount.split(".");
	if (!decPart || /^0+$/.test(decPart)) return intPart;
	return amount;
}

export default function ProductPage() {
	const params = useParams<{ id: string }>();
	const id = params?.id;
	const [product, setProduct] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		let isMounted = true;

		async function loadProduct() {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(`/api/products/${id}`);
				const json = (await response.json()) as ProductApiResponse;

				if (!response.ok) {
					throw new Error(json.error || "Unable to load product");
				}

				if (isMounted) {
					setProduct(json.data ?? null);
				}
			} catch (requestError) {
				if (isMounted) {
					setError(requestError instanceof Error ? requestError.message : "Unable to load product");
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		void loadProduct();

		return () => {
			isMounted = false;
		};
	}, [id]);

	const primaryVariant = product?.variants.nodes[0];
	const price = primaryVariant ? `${primaryVariant.price.currencyCode} ${formatAmount(primaryVariant.price.amount)}` : null;
	const imageNodes = product?.images.nodes ?? [];
	const spotlightImage = product?.featuredImage ?? imageNodes[0] ?? null;
	const otherImages = useMemo(
		() => imageNodes.filter((image) => image.id !== spotlightImage.id),
		[imageNodes, spotlightImage],
	);

	return (
		<main className="min-h-screen bg-none text-stone-950">
			<section className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 lg:px-12">
				<Link href="/shop" className="mb-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-stone-500 transition-colors hover:text-stone-900">
					<ChevronLeft className="h-4 w-4" />
					Back to shop
				</Link>

				{isLoading ? (
					<div className="flex min-h-[60vh] items-center justify-center rounded-4xl border border-stone-20 text-stone-500 shadow-sm">
						Loading product...
					</div>
				) : error ? (
					<div className="rounded-4xl border border-stone-200 p-8 text-stone-700 shadow-sm">
						<p className="text-lg font-medium text-stone-950">Unable to load product</p>
						<p className="mt-2 text-sm text-stone-500">{error}</p>
					</div>
				) : !product ? (
					<div className="rounded-4xl border border-stone-200 p-8 text-stone-700 shadow-sm">
						<p className="text-lg font-medium text-stone-950">Product not found</p>
						<p className="mt-2 text-sm text-stone-500">The requested item could not be loaded.</p>
					</div>
				) : (
					<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
						<div className="space-y-4">
							<ImageDisplay images={spotlightImage ? [spotlightImage, ...otherImages] : otherImages} />
						</div>

						<div>
							{product.productType ? (
								<p className="text-xs uppercase tracking-[0.24em] text-stone-400">{product.productType}</p>
							) : null}

							<h1 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-stone-950 sm:text-5xl">
								{product.title}
							</h1>

							<h2 className="mt-1 font-light text-[1.25rem]">
								{product.availableForSale ? price ? (
									<span>
										{price}
									</span>
								) : null : (
									<span className="line-through text-stone-700">{price}</span>
								)}
							</h2>

							<div className="mt-5 flex items-center gap-3 text-sm text-stone-500">
								<span className={`h-2.5 w-2.5 rounded-full ${product.availableForSale ? "bg-emerald-500" : "bg-stone-400"}`} />
								<span>{product.availableForSale ? "Item Available" : "Currently unavailable"}</span>
							</div>
                            {product.tags.length > 0 ? (
								<div className="mt-8">
									<p className="text-xs uppercase tracking-[0.2em] text-stone-400">Tags</p>
									<div className="mt-3 flex flex-wrap gap-2">
										{product.tags.map((tag) => (
											<span key={tag} className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-600">
												{tag}
											</span>
										))}
									</div>
								</div>
							) : null}

							{product.description ? (
								<p className="mt-6 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
									{product.description}
								</p>
							) : null}

							<div className="mt-10 flex flex-col gap-3 sm:flex-row">
								<button className="inline-flex items-center justify-center gap-2 rounded-none bg-stone-950 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01]">
									<ShoppingBag className="h-4 w-4" />
									Add to cart
								</button>
							</div>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}