import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/shopify/query";

export async function GET(request: NextRequest) {
  
  const { searchParams } = request.nextUrl;
  const first = searchParams.get("first") || "10";
  const after = searchParams.get("after") || null;

  const GRAPHQL_QUERY = `
    query {
      products(first: ${first}, ${after ? `after: "${after}"` : ""}) {
        edges {
          node {
            id
            title
            featuredImage {
              id
              url
              altText
              width
              height
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  `;

  const response = await runQuery(GRAPHQL_QUERY);

  return NextResponse.json({ data: response });
}
