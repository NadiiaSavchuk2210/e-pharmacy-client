'use client';

import ErrorStatePage from '@/shared/ui/ErrorStatePage';

type SharedErrorPageProps = {
  reset: () => void;
};

const SharedErrorPage = ({ reset }: SharedErrorPageProps) => {
  return <ErrorStatePage reset={reset} />;
};

export default SharedErrorPage;
