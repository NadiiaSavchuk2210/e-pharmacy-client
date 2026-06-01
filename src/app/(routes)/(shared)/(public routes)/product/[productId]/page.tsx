import { notFound, redirect } from 'next/navigation';

import { getProductById } from './product.data';

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

const ProductPage = async ({ params }: Props) => {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  redirect(`/product/${product.id}/description`);
};

export { generateMetadata } from './metadata';

export default ProductPage;
