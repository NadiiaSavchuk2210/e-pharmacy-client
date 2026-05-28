'use client';

import { useFormikContext } from 'formik';
import { useEffect } from 'react';

import type { CartCheckoutFormValues } from '../../model';

type CartCheckoutFormDraftSaverProps = {
  onValuesChange?: (values: CartCheckoutFormValues) => void;
};

const CartCheckoutFormDraftSaver = ({
  onValuesChange,
}: CartCheckoutFormDraftSaverProps) => {
  const { values } = useFormikContext<CartCheckoutFormValues>();

  useEffect(() => {
    onValuesChange?.(values);
  }, [onValuesChange, values]);

  return null;
};

export default CartCheckoutFormDraftSaver;
