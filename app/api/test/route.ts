import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/shopify/query";

export async function GET(request: NextRequest) {

    const GRAPHQL_QUERY = `
        query {
            products (first: 3) {
                edges {
                    node {
                        id
                        title
                    }
                }
            }
        }
    `;

    const response = await runQuery(GRAPHQL_QUERY);
    console.log("GraphQL Response as Products:", response);

    return NextResponse.json({ data: response });
}
