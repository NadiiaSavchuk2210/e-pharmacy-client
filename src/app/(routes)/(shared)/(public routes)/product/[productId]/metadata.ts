
import { SITE_NAME } from '@/shared/constants/constants';

import { getProductById } from './product.data';

import type { Metadata } from 'next';

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return {
      title: 'Product not found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = product.name;
  const description =
    product.description ??
    `${product.name} by ${product.suppliers}. Explore product details, price, availability, and customer reviews on E-Pharmacy.`;
  const canonicalPath = `/product/${product.id}`;
  const openGraphImage = `${canonicalPath}/og-image`;

  return {
    title,

    description,

    keywords: [
      product.name,
      product.category,
      product.suppliers,
      'medicine',
      'pharmacy',
      'online pharmacy',
      'healthcare',
      'buy medicine online',
      `${product.name} medicine`,
    ],

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      title: `${product.name} | E-Pharmacy`,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,

      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: `${product.name} by ${product.suppliers}`,
        },
      ],

      locale: 'en_US',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | E-Pharmacy`,
      description,
      images: [openGraphImage],
    },

    robots: {
      index: true,
      follow: true,
    },

    category: 'healthcare',
  };
}
