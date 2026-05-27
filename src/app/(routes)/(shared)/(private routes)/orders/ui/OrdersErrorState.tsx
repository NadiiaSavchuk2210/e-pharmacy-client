import { RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import StatePanel from '@/shared/ui/StatePanel';

type OrdersErrorStateProps = {
  message: string;
  onRetry: () => void;
};

const OrdersErrorState = ({ message, onRetry }: OrdersErrorStateProps) => {
  return (
    <StatePanel tone="danger" spacing="sm">
      <div>
        <p className="text-16 font-semibold leading-space-25 text-text">
          Unable to load orders.
        </p>
        <p className="mt-space-6 text-14 leading-space-20 text-text-muted">
          {message}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        size="pill"
        className="w-fit gap-space-8"
        onClick={onRetry}
      >
        <RefreshCcw className="size-4" aria-hidden="true" />
        Try again
      </Button>
    </StatePanel>
  );
};

export default OrdersErrorState;
