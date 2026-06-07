export type Category = {
  id: string;
  name: string;
  image: string;
}

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: Category["id"];
  price: number;
  currency: "USD";
  inventory: number;
  rating: number;
  featured: boolean;
  image: string;
  variants: Array<{
    id: string;
    label: string;
    available: boolean;
  }>;
};

export type ProductFilters = {
  category?: Product["category"];
  featured?: boolean;
  search?: string;
};

export const categories: Category[] = [
  { id: "mens-clothing", name: "MEN", image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80" },
  { id: "womens-clothing", name: "WOMEN", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80" },
  { id: "accessories", name: "ACCESSORIES", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80" },
];

export const products: Product[] = [
  {
    id: "prod_001",
    slug: "aero-daypack",
    name: "Aero Daypack",
    description: "A structured 22L pack with padded laptop storage and quick-access commuter pockets.",
    category: "accessories",
    price: 128,
    currency: "USD",
    inventory: 24,
    rating: 4.8,
    featured: true,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    variants: [
      { id: "black", label: "Black", available: true },
      { id: "sage", label: "Sage", available: true },
      { id: "clay", label: "Clay", available: false }
    ]
  },
  {
    id: "prod_002",
    slug: "thermal-overshirt",
    name: "Thermal Overshirt",
    description: "Midweight organic cotton overshirt cut for layering through changing weather.",
    category: "mens-clothing",
    price: 94,
    currency: "USD",
    inventory: 37,
    rating: 4.6,
    featured: true,
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80",
    variants: [
      { id: "s", label: "S", available: true },
      { id: "m", label: "M", available: true },
      { id: "l", label: "L", available: true }
    ]
  },
  {
    id: "prod_003",
    slug: "trail-cap",
    name: "Trail Cap",
    description: "Low-profile nylon cap with a moisture-wicking liner and adjustable back strap.",
    category: "accessories",
    price: 34,
    currency: "USD",
    inventory: 56,
    rating: 4.4,
    featured: false,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=80",
    variants: [
      { id: "graphite", label: "Graphite", available: true },
      { id: "navy", label: "Navy", available: true }
    ]
  },
  {
    id: "prod_004",
    slug: "weekend-tote",
    name: "Weekend Tote",
    description: "A durable canvas tote with internal bottle sleeves and reinforced carry handles.",
    category: "accessories",
    price: 76,
    currency: "USD",
    inventory: 18,
    rating: 4.7,
    featured: false,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
    variants: [
      { id: "natural", label: "Natural", available: true },
      { id: "olive", label: "Olive", available: true }
    ]
  }
];

export function listProducts(filters: ProductFilters = {}) {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    if (typeof filters.featured === "boolean" && product.featured !== filters.featured) {
      return false;
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      const searchable = `${product.name} ${product.description} ${product.category}`.toLowerCase();

      if (!searchable.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

export function getProduct(identifier: string) {
  return products.find((product) => product.id === identifier || product.slug === identifier);
}

export function getCategories() {
  return categories;
}
