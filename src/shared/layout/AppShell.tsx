'use client';

import { usePathname } from 'next/navigation';

import AuthHeader from '@/features/auth/ui/layout/AuthHeader';
import HeroBanner from '@/features/auth/ui/layout/HeroBanner';

import SharedLayout from './SharedLayout';
import { Icon } from '../ui/Icon';

interface Props {
  children: React.ReactNode;
}

const AUTH_ROUTES = new Set(['/login', '/register']);

const AppShell = ({ children }: Props) => {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.has(pathname);

  const main = (
    <main className="flex-1">
      {isAuthRoute && (
        <div className="container | flex flex-col gap-5 relative md:gap-[54px] lg:flex-row lg:items-center lg:h-[434px]">
          <HeroBanner />
          {children}

          <Icon
            name="lines"
            className="fixed bottom-0 right-0 text-brand-50 w-[216px] h-[168px] md:w-[277px] md:h-[271px] lg:w-[279px] lg:h-[257px]"
          />
        </div>
      )}
      {!isAuthRoute && <>{children}</>}
    </main>
  );

  if (isAuthRoute) {
    return (
      <>
        <AuthHeader />
        {main}
      </>
    );
  }

  return <SharedLayout>{main}</SharedLayout>;
};

export default AppShell;
