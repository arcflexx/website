import {createStorefrontClient} from '@shopify/hydrogen-react';

export const OVERRIDE_STOREFRONT_API_URL = "https://uujwhv-c7.myshopify.com/api/2026-04/graphql.json";
export const OVERRIDE_REQUEST_HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN || "",
}

export const client = createStorefrontClient({
  // load environment variables according to your framework and runtime
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  publicStorefrontToken: process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN,
});