import { getCartProductId, type CartItem } from '@/features/cart';

import CartItemRow from './CartItemRow';

type SelectedProductsSectionProps = {
  items: CartItem[];
  isCartBusy: boolean;
  pendingProductId: string | null;
  onQuantityChange: (item: CartItem, quantity: number) => void | Promise<void>;
};

const SelectedProductsSection = ({
  items,
  isCartBusy,
  pendingProductId,
  onQuantityChange,
}: SelectedProductsSectionProps) => {
  return (
    <section
      className="min-w-0 lg:sticky lg:top-[7rem] lg:pt-space-40"
      aria-labelledby="cart-products-heading"
    >
      <h2 id="cart-products-heading" className="visually-hidden">
        Selected Products
      </h2>

      <ul className="flex flex-col">
        {items.map((item) => {
          const productId = getCartProductId(item.product);

          return (
            <CartItemRow
              key={productId}
              item={item}
              isDisabled={isCartBusy || pendingProductId === productId}
              onQuantityChange={onQuantityChange}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default SelectedProductsSection;
