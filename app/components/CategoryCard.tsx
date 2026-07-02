'use client';

import { Category } from "@/lib/products";
import Link from "next/link";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="relative overflow-hidden rounded-none bg-none shadow-none transition-shadow duration-300 mx-1">
      <Link href={`/api/products?category=${category.id}`} className="block">
        <div
          className="aspect-4/5 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
          aria-label={category.name}
        />
      </Link>
      <div className="p-4 text-center">
        <h3 className="text-black text-lg font-light">{category.name}</h3>
      </div>
    </article>
  );
}
