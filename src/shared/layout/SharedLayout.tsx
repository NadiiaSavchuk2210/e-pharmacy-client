import { Suspense } from 'react';

import Footer from '@/widgets/Footer';
import Header from '@/widgets/Header';

import { FooterSkeleton, HeaderSkeleton } from './LayoutSkeletons';

interface Props {
  children: React.ReactNode;
}

const SharedLayout = ({ children }: Props) => {
  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      {children}
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default SharedLayout;
