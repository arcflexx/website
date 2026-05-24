export type {
  Cart as ShopifyCheckout,
  CartLineItem as ShopifyLineItem,
  Collection as ShopifyCollection,
  EcommerceBackendName,
  ImageAsset as ShopifyImage,
  Money,
  Product as ShopifyProduct,
  ProductVariant as ShopifyVariant,
} from './ecommerce/types';

export interface ShopifyAPIError {
  message: string;
  extensions?: {
    code?: string;
  };
}
