import type { Order } from '@/entities/order';

import OrderCard from './order-card';

type OrdersListProps = {
  orders: Order[];
};

const OrdersList = ({ orders }: OrdersListProps) => {
  return (
    <div className="grid gap-space-20 md:gap-space-24">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
