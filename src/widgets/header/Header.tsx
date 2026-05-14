'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useLogoutMutation } from '@/features/auth/logout/api/logoutApi';
import { cn } from '@/lib/utils';
import {
  AUTH_SESSION_CHANGE,
  hasAuthSession,
} from '@/shared/api/authSession';
import { HeaderUserAction } from '@/widgets/header/components/HeaderUserAction';
import { MobileMenu } from '@/widgets/header/components/MobileMenu';
import { useBodyScrollLock } from '@/widgets/header/hooks/useBodyScrollLock';

import { HeaderAuthLinks } from './components/HeaderAuthLinks';
import { HeaderLogo } from './components/HeaderLogo';
import { HeaderNavigation } from './components/HeaderNavigation';
import { MobileMenuButton } from './components/MobileMenuButton';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedInView, setIsLoggedInView] = useState(false);
  const [isHeaderGlass, setIsHeaderGlass] = useState(false);
  const logoutMutation = useLogoutMutation();
  const isHomePage = pathname === '/home';
  const isInverseHeader = isHomePage && !isHeaderGlass;
  const interactiveTone = isHeaderGlass
    ? 'sticky'
    : isInverseHeader
      ? 'inverse'
      : 'brand';

  useBodyScrollLock(isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const updateHeaderBackground = () => {
      setIsHeaderGlass(window.scrollY > 0);
    };

    updateHeaderBackground();

    window.addEventListener('scroll', updateHeaderBackground, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', updateHeaderBackground);
  }, []);

  useEffect(() => {
    const syncAuthState = () => setIsLoggedInView(hasAuthSession());

    syncAuthState();

    window.addEventListener(AUTH_SESSION_CHANGE, syncAuthState);
    window.addEventListener('storage', syncAuthState);

    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGE, syncAuthState);
      window.removeEventListener('storage', syncAuthState);
    };
  }, []);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setIsLoggedInView(false);
    router.replace('/login');
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
        <HeaderLogo
          tone={isHeaderGlass ? 'sticky' : isInverseHeader ? 'inverse' : 'default'}
        />

        <HeaderNavigation pathname={pathname} />

        {isLoggedInView ? (
          <div className="hidden xl:flex">
            <HeaderUserAction
              inverse={isInverseHeader}
              sticky={isHeaderGlass}
              isLoggingOut={logoutMutation.isPending}
              onLogout={handleLogout}
            />
          </div>
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

      <MobileMenu
        isLoggedIn={isLoggedInView}
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
