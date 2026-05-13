import { Suspense } from 'react';

import { getProductById } from './product.data';

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

const Product = async ({ params }: Props) => {
  const { productId } = await params;
  const product = await getProductById(productId);

  return <p>Product: {product.name}</p>;
};

const ProductPage = ({ params }: Props) => {
  return (
    <>
      <h1>ProductPage</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Product params={params} />
      </Suspense>
    </>
  );
};

export { generateMetadata } from './metadata';

export default ProductPage;
