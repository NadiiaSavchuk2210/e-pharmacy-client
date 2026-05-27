import { Button } from '@/components/ui/button';
import StatePanel from '@/shared/ui/StatePanel';

type CartErrorStateProps = {
  onRetry: () => void;
};

const CartErrorState = ({ onRetry }: CartErrorStateProps) => {
  return (
    <StatePanel tone="danger" spacing="sm">
      <p className="text-16 font-semibold leading-space-25 text-text">
        Unable to load cart.
      </p>
      <Button
        type="button"
        variant="outline"
        size="pill"
        className="w-fit"
        onClick={onRetry}
      >
        Try again
      </Button>
    </StatePanel>
  );
};

export default CartErrorState;
