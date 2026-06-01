'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import type { Product } from '@/entities/product';
import { useAuth } from '@/features/auth/model';
import AuthRequiredDialog from '@/features/auth/ui/AuthRequiredDialog';
import {
  getCartErrorMessage,
  getCartProductId,
  useAddProductToUserCart,
} from '@/features/cart';

import ProductCard from './ProductCard';
import {
  getProductListKey,
  getProductRevealDelay,
  getUniqueProductsById,
} from './productList.helpers';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);
  const addProductToUserCart = useAddProductToUserCart();
  const uniqueProducts = useMemo(
    () => getUniqueProductsById(products),
    [products],
  );

  const redirectPath = useMemo(() => {
    const params = searchParams.toString();

    return params ? `${pathname}?${params}` : pathname;
  }, [pathname, searchParams]);

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      setIsAuthDialogOpen(true);
      return;
    }

    const productId = getCartProductId(product);

    setPendingProductId(productId);

    try {
      await addProductToUserCart(user.id, product);
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error(getCartErrorMessage(error));
    } finally {
      setPendingProductId(null);
    }
  };

  return (
    <section aria-labelledby="medicine-products-title">
      <h2 id="medicine-products-title" className="visually-hidden">
        Products List
      </h2>

      <ul className="grid w-full grid-cols-1 justify-center gap-y-space-20 sm:grid-cols-[335px] md:grid-cols-[repeat(3,226px)] md:justify-between md:gap-y-space-32 lg:grid-cols-[repeat(4,280px)] lg:gap-y-space-40">
        {uniqueProducts.map((product, index) => {
          const cartProductId = getCartProductId(product);

          return (
            <ProductCard
              key={getProductListKey(product)}
              product={product}
              imageEager={index === 0}
              isAddToCartPending={pendingProductId === cartProductId}
              style={{ animationDelay: getProductRevealDelay(index) }}
              onAddToCart={handleAddToCart}
            />
          );
        })}
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
