'use client';

import Image from 'next/image';
import { useState } from 'react';

const PRODUCT_IMAGE_PLACEHOLDER = '/images/products/medicine-placeholder.svg';

type ProductImageProps = {
  src?: string;
  alt: string;
};

const getImageSrc = (src?: string) => {
  const normalizedSrc = src?.trim();

  if (!normalizedSrc) {
    return PRODUCT_IMAGE_PLACEHOLDER;
  }

  if (normalizedSrc.startsWith('/') || normalizedSrc.startsWith('https://')) {
    return normalizedSrc;
  }

  return PRODUCT_IMAGE_PLACEHOLDER;
};

const ProductImage = ({ src, alt }: ProductImageProps) => {
  const [imageSrc, setImageSrc] = useState(() => getImageSrc(src));

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="(min-width: 1440px) 280px, (min-width: 768px) 226px, 335px"
      className="object-contain p-space-32 transition-transform duration-[650ms] group-hover:scale-105 md:p-space-40"
      onError={() => setImageSrc(PRODUCT_IMAGE_PLACEHOLDER)}
    />
  );
};

export default ProductImage;
