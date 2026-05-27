import type { PaymentMethod } from '@/entities/order';

export const CART_COMMENT_MAX_LENGTH = 1000;

export const DEFAULT_PAYMENT_METHOD: PaymentMethod = 'cash_on_delivery';

export const CART_PAYMENT_OPTIONS: Array<{
  value: PaymentMethod;
  label: string;
}> = [
  {
    value: 'cash_on_delivery',
    label: 'Cash On Delivery',
  },
  {
    value: 'bank',
    label: 'Bank',
  },
];

export const CART_PAYMENT_METHOD_VALUES = CART_PAYMENT_OPTIONS.map(
  (option) => option.value,
);
