'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import type { Product } from '@/entities/product';
import { useAuth } from '@/features/auth/model';
import { addProductToUserCart } from '@/features/cart';

import AuthRequiredDialog from './AuthRequiredDialog';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
  currentPage: number;
};

const ProductList = ({ products, currentPage }: ProductListProps) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const redirectPath = useMemo(() => {
    const params = searchParams.toString();

    return params ? `${pathname}?${params}` : pathname;
  }, [pathname, searchParams]);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      setIsAuthDialogOpen(true);
      return;
    }

    addProductToUserCart(user.id, product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section aria-labelledby="medicine-products-title">
      <h2 id="medicine-products-title" className="visually-hidden">
        Products List
      </h2>

      <ul className="grid grid-cols-[335px] justify-center gap-y-space-20 md:grid-cols-[repeat(3,226px)] md:justify-between md:gap-y-space-32 lg:grid-cols-[repeat(4,280px)] lg:gap-y-space-40">
        {products.map((product, index) => (
          <ProductCard
            key={`${product.apiId ?? product.id}-${currentPage}-${index}`}
            product={product}
            imageEager={index === 0}
            onAddToCart={handleAddToCart}
          />
        ))}
      </ul>

      <AuthRequiredDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        redirectPath={redirectPath}
      />
    </section>
  );
};

export default ProductList;
