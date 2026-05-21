export const PRODUCT_IMAGE_PLACEHOLDER =
  '/images/products/medicine-placeholder.svg';

export const getProductImageSrc = (src?: string): string => {
  const normalizedSrc = src?.trim();

  if (!normalizedSrc) {
    return PRODUCT_IMAGE_PLACEHOLDER;
  }

  if (normalizedSrc.startsWith('/') || normalizedSrc.startsWith('https://')) {
    return normalizedSrc;
  }

  return PRODUCT_IMAGE_PLACEHOLDER;
};
