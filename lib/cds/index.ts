export type {
  AboutContent,
  CdsProvider,
  GalleryContent,
  HomeContent,
  ResolvedMedia,
  SiteContent,
} from './types';

import { createCdsProvider, getCdsProviderName } from './backend';

const cdsProvider = createCdsProvider();

export const cds = cdsProvider;
export const providerName = getCdsProviderName();

export const getSiteContent = () => cdsProvider.getSiteContent();
export { createCdsProvider, getCdsProviderName };
