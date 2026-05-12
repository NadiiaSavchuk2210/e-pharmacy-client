import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

import { HeaderAuthLinks } from './HeaderAuthLinks';
import { HeaderNavigationLinks } from './HeaderNavigationLinks';
import { HeaderUserAction } from './HeaderUserAction';
import { MobileMenuButton } from './MobileMenuButton';

type MobileMenuProps = {
  isLoggedIn: boolean;
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
};

export const MobileMenu = ({
  isLoggedIn,
  isOpen,
  pathname,
  onClose,
}: MobileMenuProps) => {
  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[rgba(29,30,33,0.45)] xl:hidden" />

        <DialogPrimitive.Content
          id="mobile-menu"
          className={cn(
            'fixed inset-y-0 right-0 z-50 flex w-[56vw] min-w-[17.5rem] max-w-[26rem] flex-col bg-header-brand-bg',
            'px-space-20 py-space-32 outline-none md:w-[41vw] md:px-space-32 xl:hidden',
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Mobile menu
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Site navigation and account links
          </DialogPrimitive.Description>

          <DialogPrimitive.Close asChild>
            <MobileMenuButton isOpen tone="inverse" onClick={onClose} />
          </DialogPrimitive.Close>

          <nav
            className="flex flex-1 items-center justify-center py-space-48"
            aria-label="Mobile navigation"
          >
            <HeaderNavigationLinks
              pathname={pathname}
              onNavigate={onClose}
              orientation="vertical"
              linkClassName="h-[2.875rem] min-w-[auto] px-[1.25rem] py-[1.25rem] text-14"
            />
          </nav>

          {isLoggedIn ? (
            <div className="flex justify-center">
              <HeaderUserAction inverse onNavigate={onClose} />
            </div>
          ) : (
            <HeaderAuthLinks
              className="flex flex-col gap-space-24"
              tone="inverse"
              onNavigate={onClose}
            />
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
