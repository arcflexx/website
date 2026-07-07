import { OVERRIDE_STOREFRONT_API_URL, OVERRIDE_REQUEST_HEADERS } from './client';

type GraphQLResponse<TData> = {
    data?: TData;
    errors?: Array<{ message: string }>;
};

export async function runQuery<TData = unknown>(query: string, variables?: Record<string, unknown>): Promise<TData> {
    const response = await fetch(OVERRIDE_STOREFRONT_API_URL, { // client.getStorefrontApiUrl()
        body: JSON.stringify({ query: query, variables: variables }),
        headers: {
            ...OVERRIDE_REQUEST_HEADERS,
        },
        method: 'POST',
    });

    if (!response.ok) {
        console.log(`GraphQL query failed: ${response.status} ${response.statusText}`);
        throw new Error(response.statusText);
    }

    const json = await response.json();

    if (json.errors?.length) {
        throw new Error(json.errors[0].message);
    }

    return json.data as TData;
}
