import {
  Cart,
  Collection,
  EcommerceBackend,
  ImageAsset,
  Money,
  Product,
  ProductVariant,
} from '../types';

interface ShopifyAPIError {
  message: string;
  extensions?: {
    code?: string;
  };
}

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_ENDPOINT = `https://${STORE_DOMAIN}/api/2024-01/graphql.json`;

function mapImage(image: { url: string; altText: string | null } | null): ImageAsset | null {
  return image ? { url: image.url, altText: image.altText } : null;
}

function mapMoney(money: Money): Money {
  return {
    amount: money.amount,
    currencyCode: money.currencyCode,
  };
}

function mapVariant(variant: {
  id: string;
  title: string;
  price: Money;
  availableForSale: boolean;
  image: { url: string; altText: string | null } | null;
}): ProductVariant {
  return {
    id: variant.id,
    title: variant.title,
    price: mapMoney(variant.price),
    availableForSale: variant.availableForSale,
    image: mapImage(variant.image),
  };
}

function mapProduct(product: {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: { edges: Array<{ node: Parameters<typeof mapVariant>[0] }> };
}): Product {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    priceRange: {
      minVariantPrice: mapMoney(product.priceRange.minVariantPrice),
      maxVariantPrice: mapMoney(product.priceRange.maxVariantPrice),
    },
    images: product.images.edges.map((edge) => edge.node).map(mapImage).filter(Boolean) as ImageAsset[],
    variants: product.variants.edges.map((edge) => mapVariant(edge.node)),
  };
}

function mapCollection(collection: {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: { url: string; altText: string | null } | null;
  products: { edges: Array<{ node: Parameters<typeof mapProduct>[0] }> };
}): Collection {
  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    description: collection.description,
    image: mapImage(collection.image),
    products: collection.products.edges.map((edge) => mapProduct(edge.node)),
  };
}

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
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
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(
        `GraphQL error: ${data.errors.map((error: ShopifyAPIError) => error.message).join(', ')}`
      );
    }

    return data.data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

function mapCart(cart: {
  id: string;
  webUrl: string;
  lineItems: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        quantity: number;
        variant: Parameters<typeof mapVariant>[0];
      };
    }>;
  };
  subtotalPrice: Money;
  totalPrice: Money;
}): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.webUrl,
    webUrl: cart.webUrl,
    provider: 'shopify',
    lineItems: cart.lineItems.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      quantity: edge.node.quantity,
      variant: mapVariant(edge.node.variant),
    })),
    subtotalPrice: mapMoney(cart.subtotalPrice),
    totalPrice: mapMoney(cart.totalPrice),
  };
}

export function createShopifyBackend(): EcommerceBackend {
  return {
    name: 'shopify',
    async getProducts(first = 10) {
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

      const data = await shopifyFetch<{
        products: { edges: Array<{ node: Parameters<typeof mapProduct>[0] }> };
      }>(query, { first });

      return data.products.edges.map((edge) => mapProduct(edge.node));
    },
    async getProductByHandle(handle) {
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

      const data = await shopifyFetch<{ productByHandle: Parameters<typeof mapProduct>[0] | null }>(
        query,
        { handle }
      );

      return data.productByHandle ? mapProduct(data.productByHandle) : null;
    },
    async getCollections(first = 10) {
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

      const data = await shopifyFetch<{
        collections: { edges: Array<{ node: Parameters<typeof mapCollection>[0] }> };
      }>(query, { first });

      return data.collections.edges.map((edge) => mapCollection(edge.node));
    },
    async createCheckout() {
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
          checkout: Parameters<typeof mapCart>[0];
          userErrors: Array<{ field: string[]; message: string }>;
        };
      }>(query);

      if (data.checkoutCreate.userErrors.length > 0) {
        throw new Error(
          `Checkout creation failed: ${data.checkoutCreate.userErrors.map((error) => error.message).join(', ')}`
        );
      }

      return mapCart(data.checkoutCreate.checkout);
    },
    async addToCheckout(checkoutId, variantId, quantity = 1) {
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
          checkout: Parameters<typeof mapCart>[0];
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
          `Failed to add item to checkout: ${data.checkoutLineItemsAdd.userErrors
            .map((error) => error.message)
            .join(', ')}`
        );
      }

      return mapCart(data.checkoutLineItemsAdd.checkout);
    },
  };
}
