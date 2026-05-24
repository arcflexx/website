import PageShell from '../../components/PageShell';
import PlaceholderProductGrid from '../../components/PlaceholderProductGrid';
import { createPlaceholderProducts } from '../placeholderProducts';

const placeholderProducts = createPlaceholderProducts("Women's Item");

export default function WomenPage() {
  return (
    <PageShell
      title="Women's Collection"
      description="Discover our premium athletic wear designed specifically for women."
      contentClassName="mt-16"
    >
      <PlaceholderProductGrid items={placeholderProducts} />
    </PageShell>
  );
}
