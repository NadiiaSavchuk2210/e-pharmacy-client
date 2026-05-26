'use client';

import Link from 'next/link';

import type { User } from '@/entities/user';
import { useUserCartItemsCount } from '@/features/cart';
import { cn } from '@/lib/utils';
import { Icon } from '@/shared/ui/Icon';

import {
  getCartItemsAriaLabel,
  getCartItemsBadgeLabel,
  getHeaderAccountFocusRingClassName,
  getHeaderAccountUserInitial,
  getHeaderAccountUserLabel,
} from './HeaderAccountActions.helpers';
import { HeaderUserAction } from './HeaderUserAction';

import type { HeaderInteractiveTone } from '../../constants';

type HeaderAccountActionsProps = {
  user: User;
  className?: string;
  tone?: HeaderInteractiveTone;
  showLogout?: boolean;
  logoutClassName?: string;
  isLoggingOut?: boolean;
  onNavigate?: () => void;
  onLogout?: () => void | Promise<void>;
};

const CART_PATH = '/cart';
const DEFAULT_LOGOUT_CLASS_NAME = 'hidden xl:inline-flex';

export const HeaderAccountActions = ({
  user,
  className,
  tone = 'brand',
  showLogout = true,
  logoutClassName = DEFAULT_LOGOUT_CLASS_NAME,
  isLoggingOut = false,
  onNavigate,
  onLogout,
}: HeaderAccountActionsProps) => {
  const cartItemsCount = useUserCartItemsCount(user.id);
  const userLabel = getHeaderAccountUserLabel(user);

  return (
    <div className={cn('flex items-center gap-[0.375rem] sm:gap-space-8', className)}>
      <Link
        href={CART_PATH}
        aria-label={`Open cart, ${getCartItemsAriaLabel(cartItemsCount)}`}
        title="Cart"
        className={cn(
          'relative flex size-9 shrink-0 items-center justify-center rounded-full border bg-neutral-0 text-brand-500 shadow-[0_-0.0625rem_0.4375rem_0_rgba(71,71,71,0.05)] sm:size-10 md:size-11',
          'transition-[background-color,border-color,color,box-shadow,transform] duration-base ease-base hover:border-brand-700 hover:text-brand-700 hover:shadow-md active:scale-95',
          'focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-offset-[0.1875rem]',
          'dark:border-border dark:bg-surface dark:text-text dark:hover:border-text dark:hover:text-text',
          getHeaderAccountFocusRingClassName(tone),
        )}
        onClick={onNavigate}
      >
        <Icon
          name="shopping-cart"
          className="size-3.5 fill-none stroke-current sm:size-4"
        />
        <span
          aria-hidden="true"
          className="absolute -right-[0.125rem] -top-[0.25rem] flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-mint-100 px-[0.125rem] text-10 font-bold leading-none text-brand-500 sm:h-4 sm:min-w-4 sm:px-[0.1875rem] sm:text-12 dark:bg-surface-muted dark:text-text"
        >
          {getCartItemsBadgeLabel(cartItemsCount)}
        </span>
      </Link>

      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mint-100 text-13 font-semibold leading-space-18 text-brand-500 sm:size-10 sm:text-14 sm:leading-space-20 md:size-11 md:text-18 md:leading-space-25 dark:bg-surface-muted dark:text-text"
        title={userLabel}
      >
        <span aria-hidden="true">{getHeaderAccountUserInitial(user)}</span>
        <span className="visually-hidden">Signed in as {userLabel}</span>
      </span>

      {showLogout ? (
        <HeaderUserAction
          className={cn('lg:ml-[0.125rem]', logoutClassName)}
          tone={tone}
          isLoggingOut={isLoggingOut}
          onLogout={onLogout}
          onNavigate={onNavigate}
        />
      ) : null}
    </div>
  );
};
