'use client';

import { Formik, type FormikHelpers } from 'formik';

import { type Cart, type CartItem } from '@/features/cart';

import CartCheckoutFormContent from './CartCheckoutFormContent';
import CartCheckoutFormDraftSaver from './CartCheckoutFormDraftSaver';
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
  onValuesChange?: (values: CartCheckoutFormValues) => void;
};

const CartCheckoutForm = ({
  cart,
  initialValues,
  isCartBusy,
  isCheckoutPending,
  pendingProductId,
  onQuantityChange,
  onSubmit,
  onValuesChange,
}: CartCheckoutFormProps) => {
  return (
    <Formik<CartCheckoutFormValues>
      enableReinitialize
      validateOnMount
      initialValues={initialValues}
      validationSchema={cartCheckoutSchema}
      onSubmit={onSubmit}
    >
      <>
        <CartCheckoutFormDraftSaver onValuesChange={onValuesChange} />
        <CartCheckoutFormContent
          cart={cart}
          isCartBusy={isCartBusy}
          isCheckoutPending={isCheckoutPending}
          pendingProductId={pendingProductId}
          onQuantityChange={onQuantityChange}
        />
      </>
    </Formik>
  );
};

export default CartCheckoutForm;
