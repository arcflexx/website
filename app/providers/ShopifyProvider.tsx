'use client';

import { ShopifyProvider } from "@shopify/hydrogen-react";
import { createContext, useContext } from "react";

const ShopifyContext = createContext<string | null>(null);

export function ShopifyWrapper({ children }: { children: React.ReactNode }) {

    const storeDomain = process.env.NEXT_PUBLIC_STORE_DOMAIN;
    const storefrontToken = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;
    const storefrontApiVersion = "2026-04";
    const countryIsoCode = "US";
    const languageIsoCode = "EN";

    console.log("Store Domain:", storeDomain);

    if (!storeDomain) {
        throw new Error("Missing NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN");
    }

    if (!storefrontToken) {
        throw new Error("Missing NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN");
    }

    return (
        <ShopifyProvider
            storeDomain={storeDomain}
            storefrontToken={storefrontToken}
            storefrontApiVersion={storefrontApiVersion}
            countryIsoCode={countryIsoCode}
            languageIsoCode={languageIsoCode}
        >
            {children}
        </ShopifyProvider>
    );
}

export const useCart = () => useContext(ShopifyContext);