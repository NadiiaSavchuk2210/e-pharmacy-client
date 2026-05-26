import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { getHeaderUserActionToneClassName } from './HeaderUserAction.styles';

import type { HeaderInteractiveTone } from '../../constants';

type HeaderUserActionProps = {
  className?: string;
  tone?: HeaderInteractiveTone;
  isLoggingOut?: boolean;
  onNavigate?: () => void;
  onLogout?: () => void | Promise<void>;
};

export const HeaderUserAction = ({
  className,
  tone = 'brand',
  isLoggingOut = false,
  onNavigate,
  onLogout,
}: HeaderUserActionProps) => {
  const handleLogout = async () => {
    if (isLoggingOut) return;

    await onLogout?.();
    onNavigate?.();
  };

  return (
    <Button
      type="button"
      variant="authLogout"
      size="authLogout"
      className={cn(getHeaderUserActionToneClassName(tone), className)}
      aria-busy={isLoggingOut}
      disabled={isLoggingOut}
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
};
