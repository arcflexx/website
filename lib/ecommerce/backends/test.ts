import { randomUUID } from 'crypto';

import {
  Cart,
  CartLineItem,
  Collection,
  EcommerceBackend,
  ImageAsset,
  Money,
  Product,
  ProductVariant,
} from '../types';

const currencyCode = 'USD';

function money(amount: number): Money {
  return {
    amount: amount.toFixed(2),
    currencyCode,
  };
}

function image(url: string, altText: string): ImageAsset {
  return { url, altText };
}

function variant(
  id: string,
  title: string,
  amount: number,
  availableForSale: boolean,
  imageValue: ImageAsset | null
): ProductVariant {
  return {
    id,
    title,
    price: money(amount),
    availableForSale,
    image: imageValue,
  };
}

const products: Product[] = [
  {
    id: 'test-product-1',
    title: 'Essential Compression Shirt',
    handle: 'essential-compression-shirt',
    description: 'A lightweight compression layer for training and recovery.',
    priceRange: {
      minVariantPrice: money(89.99),
      maxVariantPrice: money(89.99),
    },
    images: [image('https://placehold.co/800x800/png', 'Essential Compression Shirt')],
    variants: [
      variant(
        'test-variant-1',
        'Black / M',
        89.99,
        true,
        image('https://placehold.co/800x800/png', 'Essential Compression Shirt')
      ),
    ],
  },
  {
    id: 'test-product-2',
    title: 'Athletic Shorts',
    handle: 'athletic-shorts',
    description: 'Breathable shorts designed for everyday training.',
    priceRange: {
      minVariantPrice: money(69.99),
      maxVariantPrice: money(69.99),
    },
    images: [image('https://placehold.co/800x800/png', 'Athletic Shorts')],
    variants: [
      variant(
        'test-variant-2',
        'Black / L',
        69.99,
        true,
        image('https://placehold.co/800x800/png', 'Athletic Shorts')
      ),
    ],
  },
];

const collections: Collection[] = [
  {
    id: 'test-collection-1',
    title: 'Men',
    handle: 'men',
    description: 'Core menswear pieces for training and recovery.',
    image: image('https://placehold.co/1200x1200/png', 'Men collection'),
    products: [products[0], products[1]],
  },
  {
    id: 'test-collection-2',
    title: 'Women',
    handle: 'women',
    description: 'Core womenswear pieces for training and recovery.',
    image: image('https://placehold.co/1200x1200/png', 'Women collection'),
    products: [products[0]],
  },
];

interface CartState {
  cart: Cart;
}

const carts = new Map<string, CartState>();

function cloneImage(value: ImageAsset | null): ImageAsset | null {
  return value ? { ...value } : null;
}

function cloneVariant(value: ProductVariant): ProductVariant {
  return {
    ...value,
    price: { ...value.price },
    image: cloneImage(value.image),
  };
}

function cloneProduct(value: Product): Product {
  return {
    ...value,
    priceRange: {
      minVariantPrice: { ...value.priceRange.minVariantPrice },
      maxVariantPrice: { ...value.priceRange.maxVariantPrice },
    },
    images: value.images.map((item) => ({ ...item })),
    variants: value.variants.map(cloneVariant),
  };
}

function cloneCollection(value: Collection): Collection {
  return {
    ...value,
    image: cloneImage(value.image),
    products: value.products.map(cloneProduct),
  };
}

function cloneLineItem(value: CartLineItem): CartLineItem {
  return {
    ...value,
    variant: cloneVariant(value.variant),
  };
}

function cartFromProducts(id: string, lineItems: CartLineItem[] = []): Cart {
  const subtotal = lineItems.reduce((sum, item) => {
    return sum + Number(item.variant.price.amount) * item.quantity;
  }, 0);

  const cart: Cart = {
    id,
    checkoutUrl: `https://test-checkout.local/${id}`,
    webUrl: `https://test-checkout.local/${id}`,
    provider: 'test',
    lineItems: lineItems.map(cloneLineItem),
    subtotalPrice: money(subtotal),
    totalPrice: money(subtotal),
  };

  return cart;
}

function findVariant(variantId: string): ProductVariant {
  for (const product of products) {
    const match = product.variants.find((variant) => variant.id === variantId);
    if (match) {
      return cloneVariant(match);
    }
  }

  throw new Error(`Unknown test variant: ${variantId}`);
}

function upsertCartLineItem(cart: Cart, variant: ProductVariant, quantity: number): Cart {
  const existing = cart.lineItems.find((item) => item.variant.id === variant.id);
  const updatedItems = existing
    ? cart.lineItems.map((item) =>
        item.variant.id === variant.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      )
    : [
        ...cart.lineItems,
        {
          id: `line-${randomUUID()}`,
          title: variant.title,
          quantity,
          variant,
        },
      ];

  return cartFromProducts(cart.id, updatedItems);
}

function getCartOrThrow(checkoutId: string): Cart {
  const cartState = carts.get(checkoutId);
  if (!cartState) {
    throw new Error(`Unknown test checkout: ${checkoutId}`);
  }

  return cartState.cart;
}

function saveCart(cart: Cart): Cart {
  carts.set(cart.id, { cart });
  return cart;
}

export function createTestBackend(): EcommerceBackend {
  return {
    name: 'test',
    async getProducts(first = 10) {
      return products.slice(0, first).map(cloneProduct);
    },
    async getProductByHandle(handle) {
      const product = products.find((item) => item.handle === handle);
      return product ? cloneProduct(product) : null;
    },
    async getCollections(first = 10) {
      return collections.slice(0, first).map(cloneCollection);
    },
    async createCheckout() {
      return saveCart(cartFromProducts(`test-checkout-${randomUUID()}`));
    },
    async addToCheckout(checkoutId, variantId, quantity = 1) {
      if (quantity < 1) {
        throw new Error('Quantity must be at least 1');
      }

      const cart = getCartOrThrow(checkoutId);
      const updatedCart = upsertCartLineItem(cart, findVariant(variantId), quantity);
      return saveCart(updatedCart);
    },
  };
}
