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
  const { errors, isSubmitting, isValidating, submitCount } =
    useFormikContext();
  const notifiedSubmitCount = useRef(submitCount);

  useEffect(() => {
    if (submitCount === notifiedSubmitCount.current) return;
    if (isSubmitting || isValidating) return;

    notifiedSubmitCount.current = submitCount;

    const firstError = getFirstErrorMessage(errors);

    if (firstError) {
      toast.error(firstError);
    }
  }, [errors, isSubmitting, isValidating, submitCount]);

  return null;
};

export default CartValidationNotifier;
