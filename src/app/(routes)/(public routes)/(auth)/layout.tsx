import GuestRouteGuard from '@/features/auth/ui/guards/GuestRouteGuard';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return <GuestRouteGuard>{children}</GuestRouteGuard>;
};

export default AuthLayout;
