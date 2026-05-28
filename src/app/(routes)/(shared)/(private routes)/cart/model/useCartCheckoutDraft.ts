'use client';

import { useCallback, useMemo } from 'react';

import type { AuthUser } from '@/features/auth/model';

import {
  clearCartCheckoutDraft,
  getCartCheckoutDraftStorageKey,
  getParsedCartCheckoutDraft,
  saveCartCheckoutDraft,
} from './cartCheckoutDraft.storage';
import { DEFAULT_PAYMENT_METHOD } from './cartForm.config';

import type { CartCheckoutFormValues } from './cartForm.schema';

export const useCartCheckoutDraft = (user: AuthUser | null | undefined) => {
  const fallbackValues = useMemo<CartCheckoutFormValues>(
    () => ({
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      address: '',
      paymentMethod: DEFAULT_PAYMENT_METHOD,
      comment: '',
    }),
    [user?.email, user?.name, user?.phone],
  );
  const storageKey = useMemo(
    () => getCartCheckoutDraftStorageKey(user?.id),
    [user?.id],
  );
  const initialValues = useMemo(
    () => getParsedCartCheckoutDraft(storageKey, fallbackValues),
    [fallbackValues, storageKey],
  );

  const saveDraft = useCallback(
    (values: CartCheckoutFormValues) => {
      saveCartCheckoutDraft(storageKey, values, fallbackValues);
    },
    [fallbackValues, storageKey],
  );

  const clearDraft = useCallback(() => {
    clearCartCheckoutDraft(storageKey);
  }, [storageKey]);

  return {
    clearDraft,
    initialValues,
    saveDraft,
  };
};
