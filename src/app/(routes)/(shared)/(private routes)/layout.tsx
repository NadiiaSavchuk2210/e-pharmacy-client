import { Suspense } from 'react';

import AuthRouteLoader from '@/features/auth/ui/guards/AuthRouteLoader';
import PrivateRouteGuard from '@/features/auth/ui/guards/PrivateRouteGuard';

type PrivateRoutesLayoutProps = {
  children: React.ReactNode;
};

const PrivateRoutesLayout = ({ children }: PrivateRoutesLayoutProps) => {
  return (
    <Suspense fallback={<AuthRouteLoader />}>
      <PrivateRouteGuard>{children}</PrivateRouteGuard>
    </Suspense>
  );
};

export default PrivateRoutesLayout;
