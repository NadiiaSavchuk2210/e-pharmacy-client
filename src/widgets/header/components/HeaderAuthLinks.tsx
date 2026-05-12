import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { HeaderTone } from '../constants';

type HeaderAuthLinksProps = {
  className?: string;
  tone?: Extract<HeaderTone, 'brand' | 'inverse'>;
  onNavigate?: () => void;
};

export const HeaderAuthLinks = ({
  className,
  tone = 'inverse',
  onNavigate,
}: HeaderAuthLinksProps) => {
  const isBrand = tone === 'brand';
  const focusStyles = isBrand
    ? 'focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-brand-700 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-neutral-0'
    : 'focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-neutral-0 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-header-brand-bg';
  const registerButtonClassName = cn(
    focusStyles,
    isBrand &&
      'border-brand-border text-brand-500 hover:border-brand-500 hover:bg-brand-500 hover:text-text-inverse focus-visible:border-brand-500 focus-visible:bg-brand-500 focus-visible:text-text-inverse',
  );
  const loginButtonClassName = cn(
    focusStyles,
    isBrand &&
      'text-brand-500 hover:text-brand-700 focus-visible:text-brand-700 active:text-brand-700',
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
