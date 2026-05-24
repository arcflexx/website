export type {
  Cart,
  CartLineItem,
  Collection,
  EcommerceBackend,
  EcommerceBackendName,
  ImageAsset,
  Money,
  Product,
  ProductVariant,
} from './types';

import { createEcommerceBackend, getEcommerceBackendName } from './backend';

const ecommerceBackend = createEcommerceBackend();

export const ecommerce = ecommerceBackend;
export const backendName = getEcommerceBackendName();

export const getProducts = (...args: Parameters<typeof ecommerceBackend.getProducts>) =>
  ecommerceBackend.getProducts(...args);

export const getProductByHandle = (...args: Parameters<typeof ecommerceBackend.getProductByHandle>) =>
  ecommerceBackend.getProductByHandle(...args);

export const getCollections = (...args: Parameters<typeof ecommerceBackend.getCollections>) =>
  ecommerceBackend.getCollections(...args);

export const createCheckout = (...args: Parameters<typeof ecommerceBackend.createCheckout>) =>
  ecommerceBackend.createCheckout(...args);

export const addToCheckout = (...args: Parameters<typeof ecommerceBackend.addToCheckout>) =>
  ecommerceBackend.addToCheckout(...args);

export { createEcommerceBackend, getEcommerceBackendName };
