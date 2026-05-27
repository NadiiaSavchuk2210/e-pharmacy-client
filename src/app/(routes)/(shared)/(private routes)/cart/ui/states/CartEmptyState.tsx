import Link from 'next/link';

import { Button } from '@/components/ui/button';
import StatePanel from '@/shared/ui/StatePanel';

const CartEmptyState = () => {
  return (
    <StatePanel spacing="md">
      <p className="text-18 font-semibold leading-space-25 text-text">
        Your cart is empty
      </p>
      <p className="max-w-[32rem] text-14 leading-space-20 text-text-muted">
        Add medicines to the cart and return here to place your order.
      </p>
      <Button asChild variant="primary" size="pill" className="w-fit">
        <Link href="/medicine">Browse medicine</Link>
      </Button>
    </StatePanel>
  );
};

export default CartEmptyState;
