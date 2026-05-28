import { getBrowserGlobal, isBrowser } from '@/shared/lib/browser';

import { CART_PAYMENT_METHOD_VALUES } from './cartForm.config';

import type { CartCheckoutFormValues } from './cartForm.schema';

const CART_CHECKOUT_DRAFT_STORAGE_KEY_PREFIX =
  'e-pharmacy:cart-checkout-draft';

export const getCartCheckoutDraftStorageKey = (
  userId: string | null | undefined,
) => `${CART_CHECKOUT_DRAFT_STORAGE_KEY_PREFIX}:${userId ?? 'anonymous'}`;

const isObjectRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const getStringDraftValue = (value: unknown, fallback: string) => {
  return typeof value === 'string' ? value : fallback;
};

const getPaymentMethodDraftValue = (
  value: unknown,
  fallback: CartCheckoutFormValues['paymentMethod'],
) => {
  return CART_PAYMENT_METHOD_VALUES.includes(
    value as CartCheckoutFormValues['paymentMethod'],
  )
    ? (value as CartCheckoutFormValues['paymentMethod'])
    : fallback;
};

export const getParsedCartCheckoutDraft = (
  storageKey: string,
  fallbackValues: CartCheckoutFormValues,
) => {
  if (!isBrowser()) return fallbackValues;

  try {
    const rawDraft =
      getBrowserGlobal().sessionStorage?.getItem(storageKey) ?? null;

    if (!rawDraft) return fallbackValues;

    const draft: unknown = JSON.parse(rawDraft);

    if (!isObjectRecord(draft)) return fallbackValues;

    return {
      name: getStringDraftValue(draft.name, fallbackValues.name),
      email: getStringDraftValue(draft.email, fallbackValues.email),
      phone: getStringDraftValue(draft.phone, fallbackValues.phone),
      address: getStringDraftValue(draft.address, fallbackValues.address),
      paymentMethod: getPaymentMethodDraftValue(
        draft.paymentMethod,
        fallbackValues.paymentMethod,
      ),
      comment: getStringDraftValue(draft.comment, fallbackValues.comment),
    };
  } catch {
    return fallbackValues;
  }
};

const areCartCheckoutValuesEqual = (
  firstValues: CartCheckoutFormValues,
  secondValues: CartCheckoutFormValues,
) => {
  return (
    firstValues.name === secondValues.name &&
    firstValues.email === secondValues.email &&
    firstValues.phone === secondValues.phone &&
    firstValues.address === secondValues.address &&
    firstValues.paymentMethod === secondValues.paymentMethod &&
    firstValues.comment === secondValues.comment
  );
};

export const saveCartCheckoutDraft = (
  storageKey: string,
  values: CartCheckoutFormValues,
  fallbackValues: CartCheckoutFormValues,
) => {
  if (!isBrowser()) return;

  try {
    const sessionStorage = getBrowserGlobal().sessionStorage;

    if (areCartCheckoutValuesEqual(values, fallbackValues)) {
      sessionStorage?.removeItem(storageKey);
      return;
    }

    sessionStorage?.setItem(storageKey, JSON.stringify(values));
  } catch {
    // Storage can be unavailable in private browsing or strict privacy modes.
  }
};

export const clearCartCheckoutDraft = (storageKey: string) => {
  if (!isBrowser()) return;

  try {
    getBrowserGlobal().sessionStorage?.removeItem(storageKey);
  } catch {
    // Storage can be unavailable in private browsing or strict privacy modes.
  }
};
