import { NextRequest, NextResponse } from "next/server";
import { listProducts, type Product } from "@/lib/products";
import { runQuery } from "@/lib/shopify/query";

const productCategories: Product["category"][] = ["accessories", "mens-clothing", "womens-clothing"];

function parseCategory(category: string | null) {
  if (!category) {
    return undefined;
  }

  return productCategories.includes(category as Product["category"])
    ? (category as Product["category"])
    : null;
}

export async function GET(request: NextRequest) {
  // const { searchParams } = request.nextUrl;
  // const category = parseCategory(searchParams.get("category"));

  // if (category === null) {
  //   return NextResponse.json(
  //     {
  //       error: "Invalid category",
  //       allowedCategories: productCategories
  //     },
  //     { status: 400 }
  //   );
  // }

  // const featuredParam = searchParams.get("featured");
  // const featured = featuredParam === null ? undefined : featuredParam === "true";
  // const products = listProducts({
  //   category,
  //   featured,
  //   search: searchParams.get("q") ?? undefined
  // });

  // return NextResponse.json({
  //   data: products,
  //   meta: {
  //     count: products.length
  //   }
  // });

  const GRAPHQL_QUERY = `
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            images(first: 5) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await runQuery(GRAPHQL_QUERY);

  return NextResponse.json({ data: response });
}
