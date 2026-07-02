'use client';

import { CartProvider } from "@shopify/hydrogen-react";
import { createContext, useContext } from "react";

const CartContext = createContext<string | null>(null);

export function CartWrapper({ children }: { children: React.ReactNode }) {

  return (
    <CartProvider
        onLineAdd={() => {
            console.log('a line is being added');
        }}
        onLineAddComplete={() => {
            console.log('a line has been added');
        }}
    >
      {children}
    </CartProvider>
  );
}

export const useCart = () => useContext(CartContext);