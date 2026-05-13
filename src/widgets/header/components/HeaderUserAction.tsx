import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeaderUserActionProps = {
  className?: string;
  inverse?: boolean;
  isLoggingOut?: boolean;
  onNavigate?: () => void;
  onLogout?: () => void | Promise<void>;
};

export const HeaderUserAction = ({
  className,
  inverse = false,
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
      className={cn(
        inverse &&
          'border-border-inverse text-text-inverse hover:border-neutral-0 hover:bg-neutral-0 hover:text-brand-700 focus-visible:border-neutral-0 focus-visible:bg-neutral-0 focus-visible:text-brand-700',
        className,
      )}
      aria-busy={isLoggingOut}
      disabled={isLoggingOut}
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
};
