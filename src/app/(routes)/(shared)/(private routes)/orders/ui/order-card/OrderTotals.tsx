import type { Order } from '@/entities/order';

import { formatMoney } from '../../lib';

type OrderTotalsProps = Pick<
  Order,
  'additionalFee' | 'deliveryFee' | 'subtotal' | 'total'
>;

const OrderTotals = ({
  additionalFee,
  deliveryFee,
  subtotal,
  total,
}: OrderTotalsProps) => {
  return (
    <dl className="grid gap-space-8 border-t border-card-border pt-space-18 text-14 leading-space-20 md:ml-auto md:max-w-[22rem]">
      <div className="flex items-center justify-between gap-space-16 text-text-muted">
        <dt>Subtotal</dt>
        <dd>{formatMoney(subtotal)}</dd>
      </div>
      <div className="flex items-center justify-between gap-space-16 text-text-muted">
        <dt>Delivery</dt>
        <dd>{formatMoney(deliveryFee)}</dd>
      </div>
      <div className="flex items-center justify-between gap-space-16 text-text-muted">
        <dt>Additional fee</dt>
        <dd>{formatMoney(additionalFee)}</dd>
      </div>
      <div className="flex min-h-[3rem] items-center justify-between gap-space-16 rounded-[8px] bg-accent-soft px-space-16 text-16 font-semibold leading-space-22 text-text">
        <dt>Total</dt>
        <dd>{formatMoney(total)}</dd>
      </div>
    </dl>
  );
};

export default OrderTotals;
