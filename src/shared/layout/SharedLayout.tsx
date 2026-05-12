import { Suspense } from 'react';

import Footer from '@/widgets/footer/Footer';
import Header from '@/widgets/header/Header';

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
      <main className="flex-1">{children}</main>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default SharedLayout;
