'use client';

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { encodeSlash } from "@/lib/url";

export default function ProductPage({ id }: { id: string }) {
	const [data, setData] = useState<any>(null);

	function formatAmount(amount: string) {
		if (typeof amount !== 'string') return String(amount);
		if (amount.indexOf('.') === -1) return amount;
		const [intPart, decPart] = amount.split('.');
		if (!decPart || /^0+$/.test(decPart)) return intPart;
		return amount;
	}

	useEffect(() => {
		// Fetches from your internal Next.js Route Handler
		fetch(`/api/products/${encodeSlash(id)}`)
		.then((res) => res.json())
		.then((data) => setData(data))
	}, []);

	return (
		<div>
			<Navbar startTransparent={false} />

			<section className="py-15" />

			{/* Product Grid, similar to catogory grid, but square images */}
			<section>
			</section>
		</div>
	);
}
