'use client';

import { useAuth } from '@/features/auth/model';
import { getOrdersErrorMessage, useUserOrdersQuery } from '@/features/orders';
import PageTitle from '@/shared/ui/PageTitle';

import {
  OrdersEmptyState,
  OrdersErrorState,
  OrdersList,
  OrdersLoadingState,
} from './ui';

const OrdersPageClient = () => {
  const { user, isAuthLoading } = useAuth();
  const ordersQuery = useUserOrdersQuery(user?.id);
  const orders = ordersQuery.data?.orders ?? [];
  const isOrdersLoading = isAuthLoading || ordersQuery.isPending;

  const renderOrdersContent = () => {
    if (isOrdersLoading) {
      return <OrdersLoadingState />;
    }

    if (ordersQuery.isError) {
      return (
        <OrdersErrorState
          message={getOrdersErrorMessage(ordersQuery.error)}
          onRetry={() => void ordersQuery.refetch()}
        />
      );
    }

    if (orders.length === 0) {
      return <OrdersEmptyState />;
    }

    return <OrdersList orders={orders} />;
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
