import { createShopifyBackend } from './backends/shopify';
import { createTestBackend } from './backends/test';
import { EcommerceBackend, EcommerceBackendName } from './types';

function resolveBackendName(): EcommerceBackendName {
  const value = (process.env.ECOMMERCE_BACKEND ?? 'shopify').toLowerCase();

  if (value === 'shopify' || value === 'test') {
    return value;
  }

  throw new Error(`Unsupported ECOMMERCE_BACKEND value: ${process.env.ECOMMERCE_BACKEND}`);
}

export function createEcommerceBackend(name: EcommerceBackendName = resolveBackendName()): EcommerceBackend {
  if (name === 'shopify') {
    return createShopifyBackend();
  }

  return createTestBackend();
}

export function getEcommerceBackendName(): EcommerceBackendName {
  return resolveBackendName();
}
