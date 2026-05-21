'use client';

type AuthRouteLoaderProps = {
  label?: string;
};

const AuthRouteLoader = ({
  label = 'Checking authentication status',
}: AuthRouteLoaderProps) => {
  return (
    <div
      className="flex min-h-[24rem] flex-1 items-center justify-center px-space-24 py-space-60"
      role="status"
      aria-live="polite"
    >
      <span className="size-8 animate-spin rounded-full border-[0.1875rem] border-brand-100 border-t-brand-700" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
};

export default AuthRouteLoader;
