import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

const ProductPage = async ({ params }: Props) => {
  const { productId } = await params;
  redirect(`/product/${productId}/description`);
};

export { generateMetadata } from './metadata';

export default ProductPage;
