import { Suspense } from 'react';

import AuthRouteLoader from '@/features/auth/ui/guards/AuthRouteLoader';
import GuestRouteGuard from '@/features/auth/ui/guards/GuestRouteGuard';
import AuthHeader from '@/features/auth/ui/layout/AuthHeader';
import HeroBanner from '@/features/auth/ui/layout/HeroBanner';
import { Icon } from '@/shared/ui/Icon';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <AuthHeader />
      <main className="flex-1">
        <div className="container | flex flex-col gap-5 relative md:gap-[54px] lg:flex-row lg:items-center lg:h-[434px]">
          <HeroBanner />
          <Suspense fallback={<AuthRouteLoader />}>
            <GuestRouteGuard>{children}</GuestRouteGuard>
          </Suspense>

          <Icon
            name="lines"
            className="fixed bottom-0 right-0 h-[168px] w-[216px] text-brand-50 auth-lines-drift md:h-[271px] md:w-[277px] lg:h-[257px] lg:w-[279px]"
          />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
