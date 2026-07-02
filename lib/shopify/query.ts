import { client } from './client';

export async function runQuery(query: string, variables?: Record<string, unknown>) {
    const response = await fetch(client.getStorefrontApiUrl(), {
        body: JSON.stringify({
        query: query,
        variables: variables || {},
        }),
        // Generate the headers using the private token.
        headers: client.getPrivateTokenHeaders(),
        method: 'POST',
    });

    if (!response.ok) {
        console.log(`GraphQL query failed: ${response.status} ${response.statusText}`);
        throw new Error(response.statusText);
    }

    const json = await response.json();

    return {props: json};
}

