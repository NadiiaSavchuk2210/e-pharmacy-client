import type { ShippingInfo } from '@/entities/order';
import type { AuthUser } from '@/features/auth/model';
import { normalizeRegisterPhone } from '@/features/auth/register/lib/registerPhoneMask';
import type { CheckoutCartPayload } from '@/features/cart';

import { DEFAULT_PAYMENT_METHOD } from '../model';

import type { CartCheckoutFormValues } from '../model';

export const getCartCheckoutInitialValues = (
  user: AuthUser | null | undefined,
): CartCheckoutFormValues => ({
  name: user?.name ?? '',
  email: user?.email ?? '',
  phone: user?.phone ?? '',
  address: '',
  paymentMethod: DEFAULT_PAYMENT_METHOD,
  comment: '',
});

export const getShippingInfoFromCartForm = (
  values: CartCheckoutFormValues,
): ShippingInfo => ({
  name: values.name.trim(),
  email: values.email.trim(),
  phone: normalizeRegisterPhone(values.phone),
  address: values.address.trim(),
});

export const getCheckoutPayloadFromCartForm = (
  values: CartCheckoutFormValues,
): CheckoutCartPayload => {
  const comment = values.comment.trim();

  return {
    shippingInfo: getShippingInfoFromCartForm(values),
    paymentMethod: values.paymentMethod,
    ...(comment ? { comment } : {}),
  };
};
