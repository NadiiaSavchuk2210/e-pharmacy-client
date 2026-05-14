import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeaderUserActionProps = {
  className?: string;
  inverse?: boolean;
  sticky?: boolean;
  isLoggingOut?: boolean;
  onNavigate?: () => void;
  onLogout?: () => void | Promise<void>;
};

export const HeaderUserAction = ({
  className,
  inverse = false,
  sticky = false,
  isLoggingOut = false,
  onNavigate,
  onLogout,
}: HeaderUserActionProps) => {
  const handleLogout = async () => {
    if (isLoggingOut) return;

    await onLogout?.();
    onNavigate?.();
  };

  const toneClassName = sticky
    ? 'border-neutral-900/45 text-neutral-900 hover:border-brand-700 hover:bg-brand-700 hover:text-text-inverse focus-visible:border-brand-700 focus-visible:bg-brand-700 focus-visible:text-text-inverse active:border-brand-700 active:bg-brand-700 active:text-text-inverse focus-visible:ring-brand-700 focus-visible:ring-offset-bg dark:border-text/45 dark:text-text dark:hover:border-text dark:hover:bg-text dark:hover:text-bg dark:focus-visible:border-text dark:focus-visible:bg-text dark:focus-visible:text-bg dark:focus-visible:ring-text dark:active:border-text dark:active:bg-text dark:active:text-bg'
    : inverse
      ? 'border-border-inverse text-text-inverse hover:border-neutral-0 hover:bg-neutral-0 hover:text-brand-700 focus-visible:border-neutral-0 focus-visible:bg-neutral-0 focus-visible:text-brand-700'
      : undefined;

  return (
    <Button
      type="button"
      variant="authLogout"
      size="authLogout"
      className={cn(toneClassName, className)}
      aria-busy={isLoggingOut}
      disabled={isLoggingOut}
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
};
