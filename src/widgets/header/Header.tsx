'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { AUTH_LOGIN_PATH } from '@/features/auth/constants/routes';
import { useLogoutMutation } from '@/features/auth/logout/api/logoutApi';
import { useAuth } from '@/features/auth/model/useAuth';
import { cn } from '@/lib/utils';
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
  const [isHeaderGlass, setIsHeaderGlass] = useState(false);
  const { isAuthenticated, isAuthLoading } = useAuth();
  const logoutMutation = useLogoutMutation();
  const isHomePage = pathname === '/home';
  const isLoggedInView = isAuthenticated;
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
        <HeaderLogo
          tone={isHeaderGlass ? 'sticky' : isInverseHeader ? 'inverse' : 'default'}
        />

        <HeaderNavigation pathname={pathname} />

        {isAuthLoading ? (
          <div
            className="hidden items-center gap-4 xl:flex"
            aria-label="Loading account actions"
          >
            <Skeleton className="h-[2.875rem] w-[7.4375rem] rounded-4xl" />
            <Skeleton className="h-4 w-[2.75rem]" />
          </div>
        ) : isLoggedInView ? (
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
        isAuthLoading={isAuthLoading}
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
