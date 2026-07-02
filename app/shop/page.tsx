import { ArrowRight, PackageSearch, ShoppingCart, SlidersHorizontal, Star } from "lucide-react";
import Link from "next/link";
import { Category, getCategories, listProducts } from "@/lib/products";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Cart from "../components/Cart";

export default function ShopPage() {
	const products = listProducts();
	const featuredProducts = listProducts({ featured: true });
	const categories = getCategories();

	return (
		<Cart />
	);
}
