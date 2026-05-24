import PageShell from '../../components/PageShell';
import PlaceholderProductGrid from '../../components/PlaceholderProductGrid';
import { createPlaceholderProducts } from '../placeholderProducts';

const placeholderProducts = createPlaceholderProducts("Men's Item");

export default function MenPage() {
  return (
    <PageShell
      title="Men's Collection"
      description="Discover our premium athletic wear designed specifically for men."
      contentClassName="mt-16"
    >
      <PlaceholderProductGrid items={placeholderProducts} />
    </PageShell>
  );
}
