export interface ContentAssetRef {
  key: string;
  fallbackUrl: string;
}

export interface ResolvedMedia {
  url: string;
  altText: string;
}

export interface HomeContent {
  hero: {
    label: string;
    heading: string;
    subheading: string;
    videoUrl: string | null;
  };
  featuredSection: {
    heading: string;
    description: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      priceLabel: string;
      image: ResolvedMedia;
    }>;
  };
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  values: Array<{
    title: string;
    description: string;
  }>;
  closing: string;
}

export interface GalleryContent {
  heading: string;
  description: string;
  images: Array<{
    title: string;
    image: ResolvedMedia;
  }>;
}

export interface SiteContent {
  home: HomeContent;
  about: AboutContent;
  gallery: GalleryContent;
}

export interface CdsProvider {
  readonly name: 'local' | 'aws';
  getSiteContent(): Promise<SiteContent>;
}
