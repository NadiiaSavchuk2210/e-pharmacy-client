import { ReceiptText } from 'lucide-react';

import type { OrderItem } from '@/entities/order';

import OrderItemLine from './OrderItemLine';

type OrderItemsListProps = {
  items: OrderItem[];
  orderId: string;
};

const OrderItemsList = ({ items, orderId }: OrderItemsListProps) => {
  return (
    <div>
      <div className="mb-space-14 flex items-center gap-space-8 text-14 font-semibold leading-space-20 text-text">
        <ReceiptText className="size-4 text-brand-500" aria-hidden="true" />
        Items
      </div>

      <ul className="divide-y divide-card-border border-y border-card-border">
        {items.map((item) => (
          <OrderItemLine
            key={`${orderId}-${item.productId}`}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
};

export default OrderItemsList;
