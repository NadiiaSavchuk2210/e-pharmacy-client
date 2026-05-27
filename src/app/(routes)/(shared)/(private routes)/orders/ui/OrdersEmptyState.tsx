import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import StatePanel from '@/shared/ui/StatePanel';

const OrdersEmptyState = () => {
  return (
    <StatePanel spacing="md">
      <div>
        <p className="text-18 font-semibold leading-space-25 text-text">
          No orders yet
        </p>
        <p className="mt-space-8 max-w-[34rem] text-14 leading-space-20 text-text-muted">
          Your placed medicine orders will appear here with status, payment,
          delivery, and item details.
        </p>
      </div>

      <Button asChild variant="primary" size="pill" className="w-fit gap-space-8">
        <Link href="/medicine">
          <ShoppingBag className="size-4" aria-hidden="true" />
          Browse medicine
        </Link>
      </Button>
    </StatePanel>
  );
};

export default OrdersEmptyState;
