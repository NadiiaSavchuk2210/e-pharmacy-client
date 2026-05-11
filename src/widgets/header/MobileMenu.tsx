import { cn } from '@/lib/utils';

import { HeaderAuthLinks } from './HeaderAuthLinks';
import { NavigationLinks } from './HeaderNavigation';
import { HeaderUserAction } from './HeaderUserAction';

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
    <div
      id="mobile-menu"
      className={cn(
        'fixed inset-0 z-50 xl:hidden',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close menu backdrop"
        className={cn(
          'absolute inset-0 bg-[rgba(29,30,33,0.45)] transition-opacity duration-300 ease-base',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'absolute inset-y-0 right-0 flex w-[56vw] min-w-[17.5rem] max-w-[26rem] flex-col bg-header-brand-bg',
          'px-space-20 py-space-32 transition-[transform,opacity] duration-300 ease-base md:w-[41vw] md:px-space-32',
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <nav
          className="flex flex-1 items-center justify-center py-space-48"
          aria-label="Mobile navigation"
        >
          <NavigationLinks
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
      </aside>
    </div>
  );
};
