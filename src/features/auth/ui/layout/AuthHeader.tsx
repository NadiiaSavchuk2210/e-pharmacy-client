import { HeaderLogo } from '@/widgets/header/components/HeaderLogo';

const AuthHeader = () => {
  return (
    <header>
      <div className="container | py-space-25 md:py-space-28 xl:py-8">
        <HeaderLogo className="auth-logo-reveal" />
      </div>
    </header>
  );
};

export default AuthHeader;
