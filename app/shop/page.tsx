import PageShell from '../components/PageShell';
import PlaceholderProductGrid from '../components/PlaceholderProductGrid';
import { createPlaceholderProducts } from './placeholderProducts';

const placeholderProducts = createPlaceholderProducts('Product');

export default function ShopPage() {
  return (
    <PageShell
      title="Shop"
      description="Browse our complete collection of athletic wear and performance gear."
      contentClassName="mt-16"
    >
      <PlaceholderProductGrid items={placeholderProducts} />
    </PageShell>
  );
}
