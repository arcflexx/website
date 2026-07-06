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
  
  const { searchParams } = request.nextUrl;
  const category = parseCategory(searchParams.get("category"));
  const page = parseInt(searchParams.get("page") || "1", 10);

  const GRAPHQL_QUERY = `
    query {
      products(after: ${page * 10}, first: 10, query: "${category ? `category:${category}` : ""}") {
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
