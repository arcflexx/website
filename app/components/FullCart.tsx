'use client';

import { useCart } from "@shopify/hydrogen-react";
import { CartLineInput } from "@shopify/hydrogen-react/storefront-api-types";

export default function Cart() {
    return (
        <CartComponent />
    )
}

function CartComponent() {
  const {linesRemove, linesAdd, status} = useCart();

  const merchandise: CartLineInput = {merchandiseId: 'gid://shopify/ProductVariant/48364361974001'};

  return (
    <div>
      Cart Status: {status}
      <button onClick={() => linesAdd([merchandise])}>Add Line</button>
      <button onClick={() => linesRemove([merchandise.merchandiseId])}>Remove Line</button>
    </div>
  );
}