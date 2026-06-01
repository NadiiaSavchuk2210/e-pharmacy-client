import { getProductById } from './product.data';
import Product from './ui/Product';
import ProductNotFoundState from './ui/ProductNotFoundState';
import ProductTabs from './ui/ProductTabs';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ productId: string }>;
};

const Layout = async ({ children, params }: Props) => {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return <ProductNotFoundState />;
  }

  return (
    <div className="bg-surface-muted">
      <section className="container | py-space-44 md:pt-space-34 md:pb-space-120 lg:[--container-max:1184px]">
        <div className="flex flex-col gap-space-8 md:gap-space-16 lg:flex-row lg:gap-space-20 items-start justify-start">
          <Product product={product} />
          <ProductTabs productId={product.id}>{children}</ProductTabs>
        </div>
      </section>
    </div>
  );
};

export default Layout;
