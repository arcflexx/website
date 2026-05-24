import type { AboutContent, ContentAssetRef, GalleryContent, HomeContent, ResolvedMedia, SiteContent } from './types';

type AssetResolver = (asset: ContentAssetRef) => string | null;

const heroVideo: ContentAssetRef = {
  key: 'marketing/home/hero.mp4',
  fallbackUrl: process.env.CDS_HERO_VIDEO_URL ?? 'https://www.w3schools.com/html/mov_bbb.mp4',
};

const featuredCardAssets = [
  {
    key: 'marketing/home/essential-compression-shirt.jpg',
    fallbackUrl: 'https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=750',
    altText: 'Premium running top',
  },
  {
    key: 'marketing/home/athletic-shorts.jpg',
    fallbackUrl: 'https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=750',
    altText: 'Premium running top',
  },
  {
    key: 'marketing/home/featured-layer.jpg',
    fallbackUrl: 'https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=750',
    altText: 'Premium running top',
  },
  {
    key: 'marketing/home/featured-training.jpg',
    fallbackUrl: 'https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=750',
    altText: 'Premium running top',
  },
];

const galleryAssets = Array.from({ length: 6 }, (_, index) => ({
  key: `marketing/gallery/image-${index + 1}.jpg`,
  fallbackUrl: 'https://cdn-optimized.imweb.me/thumbnail/20250122/a6978eaf20abb.jpg?w=750',
  altText: `Gallery image ${index + 1}`,
}));

function resolveRequiredMedia(asset: ContentAssetRef & { altText: string }, resolveAssetUrl: AssetResolver): ResolvedMedia {
  const url = resolveAssetUrl(asset);
  if (!url) {
    throw new Error(`Missing CDS asset URL for ${asset.key}`);
  }

  return {
    url,
    altText: asset.altText,
  };
}

function resolveOptionalMedia(asset: ContentAssetRef, resolveAssetUrl: AssetResolver): string | null {
  return resolveAssetUrl(asset);
}

export function createSiteContent(resolveAssetUrl: AssetResolver): SiteContent {
  const home: HomeContent = {
    hero: {
      label: 'Arcflex Athletics',
      heading: '',
      subheading: 'Built for training, recovery, and everyday performance.',
      videoUrl: resolveOptionalMedia(heroVideo, resolveAssetUrl),
    },
    featuredSection: {
      heading: 'Featured Collection',
      description: 'Discover our handpicked selection of premium athletic wear designed for performance and style.',
      cards: [
        {
          id: 'essential-compression-shirt-1',
          title: 'Essential Compression Shirt',
          description: 'Designed to enhance blood flow and reduce muscle fatigue.',
          priceLabel: '$89.99',
          image: resolveRequiredMedia(
            { ...featuredCardAssets[0], altText: 'Premium running top' },
            resolveAssetUrl
          ),
        },
        {
          id: 'essential-compression-shirt-2',
          title: 'Essential Compression Shirt',
          description: 'Designed to enhance blood flow and reduce muscle fatigue.',
          priceLabel: '$89.99',
          image: resolveRequiredMedia(
            { ...featuredCardAssets[1], altText: 'Premium running top' },
            resolveAssetUrl
          ),
        },
        {
          id: 'athletic-shorts-1',
          title: 'Athletic Shorts',
          description: 'Lightweight and durable for all your sports activities.',
          priceLabel: '$69.99',
          image: resolveRequiredMedia(
            { ...featuredCardAssets[2], altText: 'Premium running top' },
            resolveAssetUrl
          ),
        },
        {
          id: 'athletic-shorts-2',
          title: 'Athletic Shorts',
          description: 'Lightweight and durable for all your sports activities.',
          priceLabel: '$69.99',
          image: resolveRequiredMedia(
            { ...featuredCardAssets[3], altText: 'Premium running top' },
            resolveAssetUrl
          ),
        },
      ],
    },
  };

  const about: AboutContent = {
    heading: 'About Arcflex Athletics',
    paragraphs: [
      'Arcflex Athletics is dedicated to creating premium athletic performance wear that combines innovation, quality, and style. Our mission is to empower athletes and fitness enthusiasts with apparel designed for excellence.',
      'Founded on the principles of performance and sustainability, we craft each piece with meticulous attention to detail. Our team works tirelessly to deliver products that exceed expectations and inspire confidence in every wear.',
    ],
    values: [
      {
        title: 'Quality',
        description: 'We use only the finest materials and construction methods to ensure durability and comfort.',
      },
      {
        title: 'Innovation',
        description: 'Continuously pushing boundaries to create cutting-edge athletic wear solutions.',
      },
      {
        title: 'Sustainability',
        description: 'Committed to environmentally responsible practices throughout our supply chain.',
      },
    ],
    closing:
      "Whether you're training for your next event or simply living an active lifestyle, Arcflex Athletics has the performance wear you need to succeed.",
  };

  const gallery: GalleryContent = {
    heading: 'Gallery',
    description: 'Explore our latest collection through stunning photography and lifestyle imagery.',
    images: galleryAssets.map((asset) => ({
      title: asset.altText,
      image: resolveRequiredMedia(asset, resolveAssetUrl),
    })),
  };

  return {
    home,
    about,
    gallery,
  };
}
