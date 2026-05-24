import { createSiteContent } from '../content';
import type { ContentAssetRef } from '../types';
import { CdsProvider } from '../types';

function resolveAssetUrl(asset: ContentAssetRef): string | null {
  return asset.fallbackUrl || null;
}

export function createLocalCdsProvider(): CdsProvider {
  return {
    name: 'local',
    async getSiteContent() {
      return createSiteContent(resolveAssetUrl);
    },
  };
}
