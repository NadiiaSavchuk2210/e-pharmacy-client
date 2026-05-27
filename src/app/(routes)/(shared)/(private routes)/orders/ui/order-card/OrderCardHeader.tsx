import type { OrderStatus } from '@/entities/order';

import OrderStatusBadge from './OrderStatusBadge';
import {
  formatOrderDate,
  formatOrderNumber,
} from '../../lib';

type OrderCardHeaderProps = {
  createdAt: string;
  id: string;
  status: OrderStatus;
};

const OrderCardHeader = ({
  createdAt,
  id,
  status,
}: OrderCardHeaderProps) => {
  return (
    <header className="flex flex-col gap-space-14 border-b border-card-border pb-space-18 md:flex-row md:items-start md:justify-between md:gap-space-24">
      <div className="min-w-0">
        <p className="text-12 font-semibold uppercase leading-space-16 text-text-muted">
          Order {formatOrderNumber(id)}
        </p>
        <h2 className="mt-space-4 text-18 font-semibold leading-space-25 text-text md:text-20 md:leading-space-28">
          {formatOrderDate(createdAt)}
        </h2>
      </div>

      <OrderStatusBadge status={status} />
    </header>
  );
};

export default OrderCardHeader;
