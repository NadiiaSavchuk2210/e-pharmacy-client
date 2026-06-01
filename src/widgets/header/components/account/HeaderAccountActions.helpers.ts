import type { User } from '@/entities/user';

import type { HeaderInteractiveTone } from '../../constants';

const USER_FALLBACK_INITIAL = 'U';

export const getHeaderAccountUserLabel = (user: User) => {
  return user.name.trim() || user.email.trim() || 'Current user';
};

export const getHeaderAccountUserInitial = (user: User) => {
  return (
    getHeaderAccountUserLabel(user).charAt(0).toLocaleUpperCase() ||
    USER_FALLBACK_INITIAL
  );
};

export const getCartItemsBadgeLabel = (cartItemsCount: number) => {
  return cartItemsCount > 99 ? '99+' : String(cartItemsCount);
};

export const getCartItemsAriaLabel = (cartItemsCount: number) => {
  return `${cartItemsCount} ${cartItemsCount === 1 ? 'item' : 'items'}`;
};

export const getHeaderAccountFocusRingClassName = (
  tone: HeaderInteractiveTone,
) => {
  if (tone === 'inverse') {
    return 'focus-visible:ring-neutral-0 focus-visible:ring-offset-header-brand-bg';
  }

  if (tone === 'sticky') {
    return 'focus-visible:ring-brand-700 focus-visible:ring-offset-bg';
  }

  return 'focus-visible:ring-brand-700 focus-visible:ring-offset-neutral-0 dark:focus-visible:ring-text dark:focus-visible:ring-offset-bg';
};
