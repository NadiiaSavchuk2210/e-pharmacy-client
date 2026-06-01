'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/features/auth/model';
import {
  getOrdersErrorMessage,
  ORDERS_PER_PAGE,
  useUserOrdersQuery,
} from '@/features/orders';
import PageTitle from '@/shared/ui/PageTitle';

import { getOrdersPageHref } from './lib';
import {
  OrdersEmptyState,
  OrdersErrorState,
  OrdersList,
  OrdersLoadingState,
  OrdersPagination,
} from './ui';

type OrdersPageClientProps = {
  page: number;
};

const OrdersPageClient = ({ page }: OrdersPageClientProps) => {
  const router = useRouter();
  const { user, isAuthLoading } = useAuth();
  const ordersQuery = useUserOrdersQuery(user?.id, {
    limit: ORDERS_PER_PAGE,
    page,
  });
  const orders = ordersQuery.data?.orders ?? [];
  const meta = ordersQuery.data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const currentPage = meta && meta.totalItems > 0 ? meta.currentPage : 1;
  const isOrdersLoading =
    isAuthLoading || ordersQuery.isPending || ordersQuery.isPlaceholderData;

  useEffect(() => {
    if (!meta || meta.totalItems === 0 || page <= totalPages) {
      return;
    }

    router.replace(getOrdersPageHref(totalPages));
  }, [meta, page, router, totalPages]);

  const renderOrdersContent = () => {
    if (isOrdersLoading) {
      return <OrdersLoadingState />;
    }

    if (ordersQuery.isError) {
      return (
        <OrdersErrorState
          message={getOrdersErrorMessage(ordersQuery.error)}
          onRetry={() => ordersQuery.refetch()}
        />
      );
    }

    if (orders.length === 0) {
      return <OrdersEmptyState />;
    }

    return (
      <>
        <OrdersList orders={orders} />
        <OrdersPagination currentPage={currentPage} totalPages={totalPages} />
      </>
    );
  };

  return (
    <div className="bg-bg-subtle">
      <section className="container | py-space-40 pb-space-80 md:py-[52px] md:pb-[100px] lg:pt-[68px] lg:pb-[120px] lg:[--container-max:1184px]">
        <PageTitle className="mb-space-24 md:mb-space-32">
          My orders
        </PageTitle>
        {renderOrdersContent()}
      </section>
    </div>
  );
};

export default OrdersPageClient;
