'use client';

import Link from 'next/link';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { Suspense, useEffect, type ReactNode } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { productTabsContainerClassName } from './productTabs.styles';
import ProductDescriptionSkeleton from '../description/ui/ProductDescriptionSkeleton';
import {
  getActiveProductTab,
  getProductTabHref,
  isProductTabValue,
  productTabs,
} from '../lib/productTabs';
import ReviewsSkeleton from '../reviews/ui/ReviewsSkeleton';

type ProductTabsProps = {
  children: ReactNode;
  productId: string;
};

const ProductTabs = ({ children, productId }: ProductTabsProps) => {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const activeTab = getActiveProductTab(segment);
  const fallback =
    activeTab === 'reviews' ? <ReviewsSkeleton /> : <ProductDescriptionSkeleton />;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [activeTab, productId]);

  const handleValueChange = (value: string) => {
    if (isProductTabValue(value) && value !== activeTab) {
      router.push(getProductTabHref(productId, value), { scroll: true });
    }
  };

  return (
    <Tabs
      value={activeTab}
      activationMode="manual"
      className={productTabsContainerClassName}
      onValueChange={handleValueChange}
    >
      <TabsList
        variant="default"
        aria-label="Product information"
        className="flex h-auto justify-start gap-space-8 rounded-none bg-transparent p-0 text-brand-700"
      >
        {productTabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            asChild
            className="h-[33px] rounded-full bg-accent-soft px-space-10 sm:px-space-25 py-[8px] text-14 font-medium leading-space-18 text-brand-700 data-active:bg-accent data-active:text-text-inverse data-active:shadow-none"
          >
            <Link href={getProductTabHref(productId, tab.value)} scroll>
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="text-14 leading-space-22">
        <Suspense fallback={fallback}>{children}</Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
