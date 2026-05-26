import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
  getHeaderLoginButtonClassName,
  getHeaderRegisterButtonClassName,
} from './HeaderAuthLinks.styles';

import type { HeaderInteractiveTone } from '../constants';

type HeaderAuthLinksProps = {
  className?: string;
  tone?: HeaderInteractiveTone;
  onNavigate?: () => void;
};

export const HeaderAuthLinks = ({
  className,
  tone = 'inverse',
  onNavigate,
}: HeaderAuthLinksProps) => {
  return (
    <div className={cn('items-center gap-4', className)}>
      <Button
        asChild
        variant="authRegister"
        size="authRegister"
        className={getHeaderRegisterButtonClassName(tone)}
      >
        <Link href="/register" onClick={onNavigate}>
          Register
        </Link>
      </Button>

      <Button
        asChild
        variant="authLogin"
        size="authLogin"
        className={getHeaderLoginButtonClassName(tone)}
      >
        <Link href="/login" onClick={onNavigate}>
          Login
        </Link>
      </Button>
    </div>
  );
};
