import type { Order } from '@/entities/order';

import OrderCardHeader from './OrderCardHeader';
import OrderItemsList from './OrderItemsList';
import OrderMetaDetails from './OrderMetaDetails';
import OrderTotals from './OrderTotals';

type OrderCardProps = {
  order: Order;
};

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <article className="rounded-[20px] border border-card-border bg-surface p-space-20 shadow-sm md:p-space-24">
      <OrderCardHeader
        id={order.id}
        createdAt={order.createdAt}
        status={order.status}
      />

      <div className="grid gap-space-20 py-space-20 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.45fr)] lg:gap-space-32">
        <OrderItemsList orderId={order.id} items={order.items} />
        <OrderMetaDetails
          paymentMethod={order.paymentMethod}
          shippingInfo={order.shippingInfo}
        />
      </div>

      <OrderTotals
        subtotal={order.subtotal}
        deliveryFee={order.deliveryFee}
        additionalFee={order.additionalFee}
        total={order.total}
      />
    </article>
  );
};

export default OrderCard;
