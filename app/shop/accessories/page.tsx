import PageShell from '../../components/PageShell';
import PlaceholderProductGrid from '../../components/PlaceholderProductGrid';
import { createPlaceholderProducts } from '../placeholderProducts';

const placeholderProducts = createPlaceholderProducts('Accessory');

export default function AccessoriesPage() {
  return (
    <PageShell
      title="Accessories"
      description="Complete your athletic look with our premium accessories collection."
      contentClassName="mt-16"
    >
      <PlaceholderProductGrid items={placeholderProducts} />
    </PageShell>
  );
}
