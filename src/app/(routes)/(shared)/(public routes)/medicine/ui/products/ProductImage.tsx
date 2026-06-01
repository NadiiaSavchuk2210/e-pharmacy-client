'use client';

import Image from 'next/image';
import { useState } from 'react';

import {
  getProductImageSrc,
  PRODUCT_IMAGE_PLACEHOLDER,
} from '@/entities/product';

type ProductImageProps = {
  src?: string;
  alt: string;
  eager?: boolean;
};

const ProductImage = ({ src, alt, eager = false }: ProductImageProps) => {
  const productImageSrc = getProductImageSrc(src);
  const [failedImageSrc, setFailedImageSrc] = useState<string>();
  const imageSrc =
    failedImageSrc === productImageSrc
      ? PRODUCT_IMAGE_PLACEHOLDER
      : productImageSrc;
  const isPlaceholder = imageSrc === PRODUCT_IMAGE_PLACEHOLDER;

  const handleImageError = () => {
    if (!isPlaceholder) {
      setFailedImageSrc(productImageSrc);
    }
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="(min-width: 1440px) 280px, (min-width: 1024px) 280px, (min-width: 768px) 226px, (min-width: 640px) 335px, calc(100vw - 32px)"
      preload={eager}
      fetchPriority={eager ? 'high' : undefined}
      loading={eager ? undefined : 'lazy'}
      quality={60}
      className="object-contain p-space-32 transition-transform duration-[650ms] group-hover:scale-105 md:p-space-40"
      unoptimized={isPlaceholder}
      onError={handleImageError}
    />
  );
};

export default ProductImage;
