'use client';

import { useFormikContext } from 'formik';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const getFirstErrorMessage = (errors: unknown): string | undefined => {
  if (!errors || typeof errors !== 'object') return undefined;

  for (const value of Object.values(errors)) {
    if (typeof value === 'string') return value;

    const nestedError = getFirstErrorMessage(value);

    if (nestedError) return nestedError;
  }

  return undefined;
};

const CartValidationNotifier = () => {
  const { errors, submitCount } = useFormikContext();
  const previousSubmitCount = useRef(submitCount);

  useEffect(() => {
    if (submitCount === previousSubmitCount.current) return;

    previousSubmitCount.current = submitCount;

    const firstError = getFirstErrorMessage(errors);

    if (firstError) {
      toast.error(firstError);
    }
  }, [errors, submitCount]);

  return null;
};

export default CartValidationNotifier;
