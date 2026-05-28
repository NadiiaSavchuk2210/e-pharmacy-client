'use client';

import { Form, useFormikContext } from 'formik';
import { useMemo } from 'react';

import {
  useCartDeliveryQuoteQuery,
  type Cart,
  type CartItem,
} from '@/features/cart';

import CartValidationNotifier from './CartValidationNotifier';
import PaymentMethodSection from './PaymentMethodSection';
import ShippingInfoSection from './ShippingInfoSection';
import { getShippingInfoFromCartForm } from '../../lib';
import { cartCheckoutSchema, type CartCheckoutFormValues } from '../../model';
import SelectedProductsSection from '../products/SelectedProductsSection';
import OrderSummary from '../summary/OrderSummary';

type CartCheckoutFormContentProps = {
  cart: Cart;
  isCartBusy: boolean;
  isCheckoutPending: boolean;
  pendingProductId: string | null;
  onQuantityChange: (item: CartItem, quantity: number) => void | Promise<void>;
};

const CartCheckoutFormContent = ({
  cart,
  isCartBusy,
  isCheckoutPending,
  pendingProductId,
  onQuantityChange,
}: CartCheckoutFormContentProps) => {
  const { isSubmitting, values } = useFormikContext<CartCheckoutFormValues>();
  const shippingInfo = getShippingInfoFromCartForm(values);
  const deliveryQuoteQuery = useCartDeliveryQuoteQuery({
    address: shippingInfo.address,
    cartTotalPrice: cart.totalPrice,
    enabled: cart.items.length > 0 && shippingInfo.address.length > 0,
  });
  const deliveryQuote = deliveryQuoteQuery.data;
  const subtotal = deliveryQuote?.subtotal ?? cart.totalPrice;
  const deliveryFee = deliveryQuote?.deliveryFee ?? 0;
  const additionalFee = deliveryQuote?.additionalFee ?? 0;
  const orderTotal = useMemo(
    () => subtotal + deliveryFee + additionalFee,
    [additionalFee, deliveryFee, subtotal],
  );
  const isFormValid = useMemo(
    () => cartCheckoutSchema.isValidSync(values),
    [values],
  );
  const isPlacingOrder = isSubmitting || isCheckoutPending;
  const canPlaceOrder = cart.items.length > 0 && isFormValid && !isPlacingOrder;

  return (
    <Form
      className="grid gap-space-80 max-[374px]:gap-space-48 md:gap-[64px] lg:grid-cols-[minmax(0,628px)_minmax(0,1fr)] lg:items-start lg:gap-x-[96px] lg:gap-y-0"
      noValidate
    >
      <CartValidationNotifier />

      <section
        className="flex min-w-0 flex-col gap-space-40 rounded-[27px] bg-surface px-space-20 py-space-20 max-[374px]:gap-space-32 max-[374px]:rounded-[20px] max-[374px]:px-space-16 md:px-[78px] md:py-space-40 lg:p-space-40"
        aria-labelledby="cart-checkout-heading"
      >
        <h2 id="cart-checkout-heading" className="visually-hidden">
          Checkout information
        </h2>
        <ShippingInfoSection />
        <div className="border-t border-card-border" aria-hidden="true" />
        <PaymentMethodSection />
        <div className="border-t border-card-border" aria-hidden="true" />
        <OrderSummary
          deliveryFee={deliveryFee}
          additionalFee={additionalFee}
          total={orderTotal}
          deliveryMessage={deliveryQuote?.message}
          hasDeliveryQuote={Boolean(deliveryQuote)}
          isDeliveryFetching={deliveryQuoteQuery.isFetching}
          isSubmitDisabled={!canPlaceOrder}
          isSubmitting={isPlacingOrder}
        />
      </section>

      <SelectedProductsSection
        items={cart.items}
        isCartBusy={isCartBusy}
        pendingProductId={pendingProductId}
        onQuantityChange={onQuantityChange}
      />
    </Form>
  );
};

export default CartCheckoutFormContent;
