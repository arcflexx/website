/**
 * TypeScript interfaces for Shopify Storefront API
 */

/**
 * Shopify Product interface
 */
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
}

/**
 * Shopify Product Variant interface
 */
export interface ShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  image: {
    url: string;
    altText: string | null;
  } | null;
}

/**
 * Shopify Collection interface
 */
export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

/**
 * Shopify Checkout interface
 */
export interface ShopifyCheckout {
  id: string;
  webUrl: string;
  lineItems: ShopifyLineItem[];
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
}

/**
 * Shopify Line Item interface (Cart item)
 */
export interface ShopifyLineItem {
  id: string;
  title: string;
  quantity: number;
  variant: ShopifyVariant;
}

/**
 * Shopify API Error response
 */
export interface ShopifyAPIError {
  message: string;
  extensions?: {
    code?: string;
  };
}
