import type { OrderItem } from '@/entities/order';

import { formatMoney } from '../../lib';

type OrderItemLineProps = {
  item: OrderItem;
};

const OrderItemLine = ({ item }: OrderItemLineProps) => {
  return (
    <li
      className="grid gap-space-8 py-space-12 text-14 leading-space-20 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
    >
      <div className="min-w-0">
        <p className="truncate font-medium text-text" title={item.name}>
          {item.name}
        </p>
        <p className="text-12 leading-space-16 text-text-muted">
          {item.quantity} x {formatMoney(item.price)}
        </p>
      </div>
      <p className="font-semibold text-text">{formatMoney(item.total)}</p>
    </li>
  );
};

export default OrderItemLine;
