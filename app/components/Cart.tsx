'use client';

import { CartProvider, useCart } from "@shopify/hydrogen-react";
import { CartLineInput } from "@shopify/hydrogen-react/storefront-api-types";

export default function Cart() {
    return (
        <CartComponent />
    )
}

function CartComponent() {
  const {linesAdd, status} = useCart();

  const merchandise: CartLineInput = {merchandiseId: 'gid://shopify/ProductVariant/48364361974001'};

  return (
    <div>
      Cart Status: {status}
      <button onClick={() => linesAdd([merchandise])}>Add Line</button>
    </div>
  );
}