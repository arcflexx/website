'use client';

import Navbar from "../components/common/Navbar";
import { useEffect, useState } from "react";
import { encodeSlash } from "@/lib/url";
import { ProductCard } from "../components/shop/ProductCard";
import { Money } from "@shopify/hydrogen-react";

export default function ProductPage({ id }: { id: string }) {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		// Fetches from your internal Next.js Route Handler
		fetch(`/api/products/${encodeSlash(id)}`)
		.then((res) => res.json())
		.then((data) => {setData(data)})
	}, []);

	return (
		<div>
			<Navbar startTransparent={false} />

			<section className="py-15" />

			<section>
				<div>
					{!data && <p className="text-center">Loading...</p>}
					{data && (() => {
						return (
							<div className="grid grid-cols-2 md:grid-cols-4 gap-0">
								{data.data.products.edges.map((edge: any) => (
									<ProductCard key={edge.node.id} href={`/shop/${encodeSlash(edge.node.id)}`} title={edge.node.title} price={(<Money data={edge.node.variants.edges[0].node.price} className="font-extralight text-[0.8rem]" />)} imageSrc={edge.node.featuredImage?.url || ''} />
								))}
							</div>
						)
					})()}
				</div>
			</section>
		</div>
	);
}
