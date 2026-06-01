import { getCurrentPage, type OrdersRouteSearchParams } from './lib';
import OrdersPageClient from './OrdersPageClient';

type OrdersPageProps = {
  searchParams: OrdersRouteSearchParams;
};

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = getCurrentPage(resolvedSearchParams);

  return <OrdersPageClient page={page} />;
};

export { metadata } from './metadata';

export default OrdersPage;
