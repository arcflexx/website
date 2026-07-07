import { NextResponse } from "next/server";
import { runQuery } from "@/lib/shopify/query";
import { toProduct, type ProductQueryData } from "@/lib/products";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const GRAPHQL_QUERY = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      description
      productType
      tags
      availableForSale
      featuredImage {
        id
        url
        altText
        width
        height
      }
      images(first: 10) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const response = await runQuery<ProductQueryData>(GRAPHQL_QUERY, { id: id });
  const product = toProduct(response);
  
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ data: product });
}
