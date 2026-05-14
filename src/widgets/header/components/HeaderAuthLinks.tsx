import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { HeaderTone } from '../constants';

type HeaderAuthLinksProps = {
  className?: string;
  tone?: Extract<HeaderTone, 'brand' | 'inverse' | 'sticky'>;
  onNavigate?: () => void;
};

export const HeaderAuthLinks = ({
  className,
  tone = 'inverse',
  onNavigate,
}: HeaderAuthLinksProps) => {
  const isBrand = tone === 'brand';
  const isSticky = tone === 'sticky';
  const focusStyles = isSticky
    ? 'focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-brand-700 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-bg dark:focus-visible:ring-text'
    : isBrand
      ? 'focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-brand-700 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-neutral-0 dark:focus-visible:ring-text dark:focus-visible:ring-offset-bg'
      : 'focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-neutral-0 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-header-brand-bg';
  const registerButtonClassName = cn(
    focusStyles,
    isBrand &&
      'border-brand-700/50 text-brand-700 hover:border-brand-700 hover:bg-brand-700 hover:text-text-inverse focus-visible:border-brand-700 focus-visible:bg-brand-700 focus-visible:text-text-inverse dark:border-text/45 dark:text-text dark:hover:border-text dark:hover:bg-text dark:hover:text-bg dark:focus-visible:border-text dark:focus-visible:bg-text dark:focus-visible:text-bg',
    isSticky &&
      'border-neutral-900/45 text-neutral-900 hover:border-brand-700 hover:bg-brand-700 hover:text-text-inverse focus-visible:border-brand-700 focus-visible:bg-brand-700 focus-visible:text-text-inverse active:border-brand-700 active:bg-brand-700 active:text-text-inverse dark:border-text/45 dark:text-text dark:hover:border-text dark:hover:bg-text dark:hover:text-bg dark:focus-visible:border-text dark:focus-visible:bg-text dark:focus-visible:text-bg dark:active:border-text dark:active:bg-text dark:active:text-bg',
  );
  const loginButtonClassName = cn(
    focusStyles,
    isBrand &&
      'text-brand-700 hover:text-brand-700 focus-visible:text-brand-700 active:text-brand-700 dark:text-text dark:hover:text-text dark:focus-visible:text-text dark:active:text-text',
    isSticky &&
      'text-neutral-900 hover:text-brand-700 focus-visible:text-brand-700 active:text-brand-700 dark:text-text dark:hover:text-text dark:focus-visible:text-text dark:active:text-text',
  );

  return (
    <div className={cn('items-center gap-4', className)}>
      <Button
        asChild
        variant="authRegister"
        size="authRegister"
        className={registerButtonClassName}
      >
        <Link href="/register" onClick={onNavigate}>
          Register
        </Link>
      </Button>

      <Button
        asChild
        variant="authLogin"
        size="authLogin"
        className={loginButtonClassName}
      >
        <Link href="/login" onClick={onNavigate}>
          Login
        </Link>
      </Button>
    </div>
  );
};
