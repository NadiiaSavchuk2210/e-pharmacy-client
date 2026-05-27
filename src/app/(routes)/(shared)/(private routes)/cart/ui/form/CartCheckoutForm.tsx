'use client';

import { Formik, type FormikHelpers } from 'formik';

import { type Cart, type CartItem } from '@/features/cart';

import CartCheckoutFormContent from './CartCheckoutFormContent';
import { cartCheckoutSchema, type CartCheckoutFormValues } from '../../model';

type CartCheckoutFormProps = {
  cart: Cart;
  initialValues: CartCheckoutFormValues;
  isCartBusy: boolean;
  isCheckoutPending: boolean;
  pendingProductId: string | null;
  onQuantityChange: (item: CartItem, quantity: number) => void | Promise<void>;
  onSubmit: (
    values: CartCheckoutFormValues,
    helpers: FormikHelpers<CartCheckoutFormValues>,
  ) => void | Promise<void>;
};

const CartCheckoutForm = ({
  cart,
  initialValues,
  isCartBusy,
  isCheckoutPending,
  pendingProductId,
  onQuantityChange,
  onSubmit,
}: CartCheckoutFormProps) => {
  return (
    <Formik<CartCheckoutFormValues>
      enableReinitialize
      validateOnMount
      initialValues={initialValues}
      validationSchema={cartCheckoutSchema}
      onSubmit={onSubmit}
    >
      <CartCheckoutFormContent
        cart={cart}
        isCartBusy={isCartBusy}
        isCheckoutPending={isCheckoutPending}
        pendingProductId={pendingProductId}
        onQuantityChange={onQuantityChange}
      />
    </Formik>
  );
};

export default CartCheckoutForm;
