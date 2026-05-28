'use client';

import Link from 'next/link';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { ReactNode } from 'react';

const productTabs = [
  {
    value: 'description',
    label: 'Description',
  },
  {
    value: 'reviews',
    label: 'Reviews',
  },
] as const;

type ProductTabValue = (typeof productTabs)[number]['value'];

type ProductTabsProps = {
  children: ReactNode;
  productId: string;
};

const getProductTabHref = (productId: string, tab: ProductTabValue) =>
  `/product/${productId}/${tab}`;

const isProductTabValue = (value: string): value is ProductTabValue =>
  productTabs.some((tab) => tab.value === value);

const getActiveTab = (segment: string | null): ProductTabValue => {
  if (segment === 'reviews') {
    return 'reviews';
  }

  return 'description';
};

const ProductTabs = ({ children, productId }: ProductTabsProps) => {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const activeTab = getActiveTab(segment);

  const handleValueChange = (value: string) => {
    if (isProductTabValue(value) && value !== activeTab) {
      router.push(getProductTabHref(productId, value));
    }
  };

  return (
    <Tabs
      value={activeTab}
      activationMode="manual"
      className="rounded-[27px] bg-surface p-space-20 pb-space-40 md:p-space-32 md:pb-space-64 md:gap-space-32 lg:p-space-40 lg:pb-space-80 lg:gap-space-40"
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
            <Link href={getProductTabHref(productId, tab.value)}>
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="text-14 leading-space-22">
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
