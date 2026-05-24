export type PlaceholderProduct = {
  id: number;
  title: string;
};

export function createPlaceholderProducts(label: string, count = 8): PlaceholderProduct[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `${label} ${index + 1}`,
  }));
}