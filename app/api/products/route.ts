import { NextRequest, NextResponse } from "next/server";
import { listProducts, type Product } from "@/lib/products";

const productCategories: Product["category"][] = ["bags", "apparel", "accessories"];

function parseCategory(category: string | null) {
  if (!category) {
    return undefined;
  }

  return productCategories.includes(category as Product["category"])
    ? (category as Product["category"])
    : null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = parseCategory(searchParams.get("category"));

  if (category === null) {
    return NextResponse.json(
      {
        error: "Invalid category",
        allowedCategories: productCategories
      },
      { status: 400 }
    );
  }

  const featuredParam = searchParams.get("featured");
  const featured = featuredParam === null ? undefined : featuredParam === "true";
  const products = listProducts({
    category,
    featured,
    search: searchParams.get("q") ?? undefined
  });

  return NextResponse.json({
    data: products,
    meta: {
      count: products.length
    }
  });
}
