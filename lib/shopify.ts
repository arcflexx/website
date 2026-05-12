import {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCheckout,
  ShopifyAPIError,
} from './types';

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const API_ENDPOINT = `https://${STORE_DOMAIN}/api/2024-01/graphql.json`;

/**
 * Make a request to the Shopify Storefront API
 * @param query - GraphQL query string
 * @param variables - Query variables
 * @returns Promise with API response
 */
async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!STORE_DOMAIN || !ACCESS_TOKEN) {
    throw new Error(
      'Missing Shopify environment variables: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN'
    );
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(
        `GraphQL error: ${data.errors
          .map((e: ShopifyAPIError) => e.message)
          .join(', ')}`
      );
    }

    return data.data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

/**
 * Fetch all products from the Shopify store
 * @param first - Number of products to fetch (max 100)
 * @returns Promise resolving to array of ShopifyProduct
 */
export async function getProducts(first: number = 10): Promise<ShopifyProduct[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
    query,
    { first }
  );

  return data.products.edges.map((edge) => edge.node);
}

/**
 * Fetch a single product by handle
 * @param handle - Product handle (slug)
 * @returns Promise resolving to ShopifyProduct
 */
export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(query, {
    handle,
  });

  return data.productByHandle;
}

/**
 * Fetch all collections from the Shopify store
 * @param first - Number of collections to fetch (max 100)
 * @returns Promise resolving to array of ShopifyCollection
 */
export async function getCollections(first: number = 10): Promise<ShopifyCollection[]> {
  const query = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
            products(first: 5) {
              edges {
                node {
                  id
                  title
                  handle
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                        title
                        price {
                          amount
                          currencyCode
                        }
                        availableForSale
                        image {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ collections: { edges: Array<{ node: ShopifyCollection }> } }>(
    query,
    { first }
  );

  return data.collections.edges.map((edge) => edge.node);
}

/**
 * Create a checkout (cart) on Shopify
 * @returns Promise resolving to ShopifyCheckout
 */
export async function createCheckout(): Promise<ShopifyCheckout> {
  const query = `
    mutation CreateCheckout {
      checkoutCreate(input: {}) {
        checkout {
          id
          webUrl
          lineItems(first: 50) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    checkoutCreate: {
      checkout: ShopifyCheckout;
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>(query);

  if (data.checkoutCreate.userErrors.length > 0) {
    throw new Error(
      `Checkout creation failed: ${data.checkoutCreate.userErrors.map((e) => e.message).join(', ')}`
    );
  }

  return data.checkoutCreate.checkout;
}

/**
 * Add an item to a checkout
 * @param checkoutId - Checkout ID
 * @param variantId - Product variant ID
 * @param quantity - Quantity to add
 * @returns Promise resolving to updated ShopifyCheckout
 */
export async function addToCheckout(
  checkoutId: string,
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCheckout> {
  const query = `
    mutation AddToCheckout($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
          lineItems(first: 50) {
            edges {
              node {
                id
                title
                quantity
                variant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    checkoutLineItemsAdd: {
      checkout: ShopifyCheckout;
      userErrors: Array<{ field: string[]; message: string }>;
    };
  }>(query, {
    checkoutId,
    lineItems: [
      {
        variantId,
        quantity,
      },
    ],
  });

  if (data.checkoutLineItemsAdd.userErrors.length > 0) {
    throw new Error(
      `Failed to add item to checkout: ${data.checkoutLineItemsAdd.userErrors.map((e) => e.message).join(', ')}`
    );
  }

  return data.checkoutLineItemsAdd.checkout;
}
