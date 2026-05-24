export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ImageAsset {
  url: string;
  altText: string | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: Money;
  availableForSale: boolean;
  image: ImageAsset | null;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  images: ImageAsset[];
  variants: ProductVariant[];
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ImageAsset | null;
  products: Product[];
}

export interface CartLineItem {
  id: string;
  title: string;
  quantity: number;
  variant: ProductVariant;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  webUrl: string;
  provider: EcommerceBackendName;
  lineItems: CartLineItem[];
  subtotalPrice: Money;
  totalPrice: Money;
}

export type EcommerceBackendName = 'shopify' | 'test';

export interface EcommerceBackend {
  readonly name: EcommerceBackendName;
  getProducts(first?: number): Promise<Product[]>;
  getProductByHandle(handle: string): Promise<Product | null>;
  getCollections(first?: number): Promise<Collection[]>;
  createCheckout(): Promise<Cart>;
  addToCheckout(checkoutId: string, variantId: string, quantity?: number): Promise<Cart>;
}
