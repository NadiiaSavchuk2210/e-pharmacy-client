'use client';

import { useFormikContext } from 'formik';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

import { type RegisterFormValues } from '../model/registerSchema';

const RegisterValidationNotifier = () => {
  const { errors, submitCount } = useFormikContext<RegisterFormValues>();
  const previousSubmitCount = useRef(submitCount);

  useEffect(() => {
    if (submitCount === previousSubmitCount.current) return;

    previousSubmitCount.current = submitCount;

    const firstError = Object.values(errors)[0];

    if (firstError) {
      toast.error(firstError);
    }
  }, [errors, submitCount]);

  return null;
};

export default RegisterValidationNotifier;
