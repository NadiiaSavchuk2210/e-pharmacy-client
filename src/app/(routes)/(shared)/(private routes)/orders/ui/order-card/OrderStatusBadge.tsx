import type { OrderStatus } from '@/entities/order';
import { cn } from '@/lib/utils';

import {
  getOrderStatusClassName,
  getOrderStatusLabel,
} from '../../lib';

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex h-[2rem] w-fit items-center rounded-full px-space-14 text-12 font-semibold uppercase leading-space-16',
        getOrderStatusClassName(status),
      )}
    >
      {getOrderStatusLabel(status)}
    </span>
  );
};

export default OrderStatusBadge;
