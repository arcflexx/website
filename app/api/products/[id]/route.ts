import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { runQuery, resolveQuery } from "@/lib/shopify/query";

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
`;

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const product = await runQuery(resolveQuery(GRAPHQL_QUERY, { id })).then((response) => response.props.data.product);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ data: product });
}
