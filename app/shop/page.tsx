'use client';

import { ArrowRight, PackageSearch, ShoppingCart, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";
import { Category, getCategories, listProducts } from "@/lib/products";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Cart from "../components/FullCart";
import { useEffect, useState } from "react";
import { toProduct } from "@/lib/shopify/query";

export default function ShopPage() {
	const [data, setData] = useState(null);
	const id = "48364361974001"; // Replace with the actual product ID you want to fetch

	useEffect(() => {
		// Fetches from your internal Next.js Route Handler
		fetch('/api/products/' + id) 
		.then((res) => res.json())
		.then((data) => console.log('data', data));
	}, []);

	return (
		<div>
			<Cart />
		</div>
	);
}
