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
  const logoutMutation = useLogoutMutation();
  const isHomePage = pathname === '/home';

  useBodyScrollLock(isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

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
    <header className={cn(isHomePage && 'bg-header-brand-bg')}>
      <div className="container | flex w-full items-center justify-between py-space-25 md:py-space-28 xl:py-8">
        <HeaderLogo tone={isHomePage ? 'inverse' : 'default'} />

        <HeaderNavigation pathname={pathname} />

        {isLoggedInView ? (
          <div className="hidden xl:flex">
            <HeaderUserAction
              inverse={isHomePage}
              isLoggingOut={logoutMutation.isPending}
              onLogout={handleLogout}
            />
          </div>
        ) : (
          <HeaderAuthLinks
            className="hidden xl:flex"
            tone={isHomePage ? 'inverse' : 'brand'}
          />
        )}

        {!isMenuOpen && (
          <MobileMenuButton
            isOpen={false}
            controlsId="mobile-menu"
            hasPopup
            tone={isHomePage ? 'inverse' : 'brand'}
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
