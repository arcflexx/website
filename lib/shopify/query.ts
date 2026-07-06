import { client } from './client';
import { Product } from '@shopify/hydrogen-react/storefront-api-types';

export async function runQuery(query: string) {
    const response = await fetch(client.getStorefrontApiUrl(), {
        body: JSON.stringify({
        query: query,
        }),
        // Generate the headers using the private token.
        headers: client.getPublicTokenHeaders(),
        method: 'POST',
    });

    if (!response.ok) {
        console.log(`GraphQL query failed: ${response.status} ${response.statusText}`);
        throw new Error(response.statusText);
    }

    const json = await response.json();

    return {props: json};
}
