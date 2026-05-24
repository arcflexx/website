import { createSiteContent } from '../content';
import { CdsProvider } from '../types';

const assetBaseUrl = process.env.CDS_ASSET_BASE_URL;

function resolveAssetUrl(asset: { key: string; fallbackUrl: string }): string | null {
  if (assetBaseUrl) {
    return new URL(asset.key, `${assetBaseUrl.replace(/\/?$/, '/')}`).toString();
  }

  return asset.fallbackUrl || null;
}

export function createAwsCdsProvider(): CdsProvider {
  return {
    name: 'aws',
    async getSiteContent() {
      return createSiteContent(resolveAssetUrl);
    },
  };
}
