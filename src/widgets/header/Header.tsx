'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { AUTH_LOGIN_PATH } from '@/features/auth/constants/routes';
import { useLogoutMutation } from '@/features/auth/logout/api/logoutApi';
import { useAuth } from '@/features/auth/model/useAuth';
import { cn } from '@/lib/utils';
import { useBodyScrollLock } from '@/widgets/header/hooks/useBodyScrollLock';
import { useHeaderGlass } from '@/widgets/header/hooks/useHeaderGlass';

import { HeaderAccountActions } from './components/account/HeaderAccountActions';
import { HeaderAccountActionsSkeleton } from './components/account/HeaderAccountActionsSkeleton';
import { HeaderAuthLinks } from './components/HeaderAuthLinks';
import { HeaderLogo } from './components/HeaderLogo';
import { MobileMenu } from './components/mobile-menu/MobileMenu';
import { MobileMenuButton } from './components/mobile-menu/MobileMenuButton';
import { HeaderNavigation } from './components/navigation/HeaderNavigation';
import { getHeaderInteractiveTone, getHeaderTone } from './header.helpers';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHeaderGlass = useHeaderGlass();
  const { user, isAuthenticated, isAuthLoading } = useAuth();
  const logoutMutation = useLogoutMutation();
  const isHomePage = pathname === '/home';
  const isLoggedInView = isAuthenticated && Boolean(user);
  const headerTone = getHeaderTone({ isHeaderGlass, isHomePage });
  const interactiveTone = getHeaderInteractiveTone(headerTone);

  useBodyScrollLock(isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.replace(AUTH_LOGIN_PATH);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-base ease-base',
        isHeaderGlass
          ? 'border-b border-neutral-0/20 bg-neutral-0/35 shadow-[0_0.0625rem_0_rgb(255_255_255_/_0.35)_inset] backdrop-blur-2xl backdrop-saturate-150'
          : isHomePage
            ? 'bg-header-brand-bg'
            : 'bg-bg',
      )}
    >
      <div className="container | flex w-full items-center justify-between py-space-25 md:py-space-28 xl:py-8">
        <HeaderLogo tone={headerTone} />

        <HeaderNavigation pathname={pathname} />

        <div className="flex items-center gap-space-10 md:gap-space-16 lg:gap-space-16">
          {isAuthLoading ? (
            <HeaderAccountActionsSkeleton className="hidden xl:flex" />
          ) : isLoggedInView && user ? (
            <HeaderAccountActions
              user={user}
              tone={interactiveTone}
              isLoggingOut={logoutMutation.isPending}
              onLogout={handleLogout}
            />
          ) : (
            <HeaderAuthLinks
              className="hidden xl:flex"
              tone={interactiveTone}
            />
          )}

          {!isMenuOpen && (
            <MobileMenuButton
              isOpen={false}
              controlsId="mobile-menu"
              hasPopup
              tone={interactiveTone}
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>
      </div>

      <MobileMenu
        isAuthLoading={isAuthLoading}
        user={isLoggedInView ? user : null}
        isOpen={isMenuOpen}
        pathname={pathname}
        isLoggingOut={logoutMutation.isPending}
        onLogout={handleLogout}
        onClose={closeMenu}
      />
    </header>
  );
};

export default Header;
