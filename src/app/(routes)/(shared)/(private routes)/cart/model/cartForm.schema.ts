import * as Yup from 'yup';

import type { PaymentMethod } from '@/entities/order';
import { isValidRegisterPhone } from '@/features/auth/register/lib/isValidRegisterPhone';

import {
  CART_COMMENT_MAX_LENGTH,
  CART_PAYMENT_METHOD_VALUES,
  DEFAULT_PAYMENT_METHOD,
} from './cartForm.config';

export const cartCheckoutSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .max(100, 'Name must be 100 characters or less'),
  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(120, 'Email must be 120 characters or less'),
  phone: Yup.string()
    .trim()
    .required('Phone is required')
    .max(30, 'Phone must be 30 characters or less')
    .test(
      'phone-number',
      'Please enter a valid phone number',
      isValidRegisterPhone,
    ),
  address: Yup.string()
    .trim()
    .required('Address is required')
    .max(250, 'Address must be 250 characters or less'),
  paymentMethod: Yup.mixed<PaymentMethod>()
    .oneOf(CART_PAYMENT_METHOD_VALUES, 'Choose a valid payment method')
    .required('Payment method is required')
    .default(DEFAULT_PAYMENT_METHOD),
  comment: Yup.string()
    .trim()
    .max(
      CART_COMMENT_MAX_LENGTH,
      `Comment must be ${CART_COMMENT_MAX_LENGTH} characters or less`,
    )
    .default(''),
});

export type CartCheckoutFormValues = Yup.InferType<
  typeof cartCheckoutSchema
>;
