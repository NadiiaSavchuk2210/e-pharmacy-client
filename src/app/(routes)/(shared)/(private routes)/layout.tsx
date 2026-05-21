import PrivateRouteGuard from '@/features/auth/ui/guards/PrivateRouteGuard';

type PrivateRoutesLayoutProps = {
  children: React.ReactNode;
};

const PrivateRoutesLayout = ({ children }: PrivateRoutesLayoutProps) => {
  return <PrivateRouteGuard>{children}</PrivateRouteGuard>;
};

export default PrivateRoutesLayout;
