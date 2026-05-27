import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { formatMoney } from '../../lib';
import {
  cartCheckoutSectionDescriptionClassName,
  cartCheckoutSectionTitleClassName,
} from '../cartCheckoutSection.styles';

type OrderSummaryProps = {
  deliveryFee: number;
  additionalFee: number;
  total: number;
  deliveryMessage?: string;
  hasDeliveryQuote: boolean;
  isDeliveryFetching: boolean;
  isSubmitDisabled: boolean;
  isSubmitting: boolean;
};

const OrderSummary = ({
  deliveryFee,
  additionalFee,
  total,
  deliveryMessage,
  hasDeliveryQuote,
  isDeliveryFetching,
  isSubmitDisabled,
  isSubmitting,
}: OrderSummaryProps) => {
  const shippingStatusMessage = isDeliveryFetching
    ? 'Calculating shipping cost.'
    : hasDeliveryQuote
      ? deliveryMessage || 'Shipping cost is included in your total.'
      : 'Enter your address to see shipping cost.';

  return (
    <section
      className="flex flex-col gap-space-20"
      aria-labelledby="cart-order-details-heading"
    >
      <div>
        <h2
          id="cart-order-details-heading"
          className={cn(
            cartCheckoutSectionTitleClassName,
            'mb-space-12 md:mb-space-14',
          )}
        >
          Order details
        </h2>
        <p className={cartCheckoutSectionDescriptionClassName}>
          Shipping and additional costs are calculated based on values you have
          entered.
        </p>
      </div>

      <dl className="text-14 leading-space-20">
        <div className="flex min-h-[3.625rem] items-center justify-between gap-space-16 rounded-[8px] bg-accent-soft px-space-18 py-space-14 md:p-space-20">
          <dt className="text-16 font-semibold leading-space-22 text-text md:text-18 md:leading-space-25">
            Total:
          </dt>
          <dd className="text-16 font-semibold leading-space-20 text-text md:text-18 md:leading-space-25">
            {formatMoney(total)}
          </dd>
        </div>
      </dl>

      <div className="rounded-[8px] border border-card-border bg-bg px-space-18 py-space-14 text-14 leading-space-20 text-text-muted md:px-space-20">
        {hasDeliveryQuote ? (
          <dl className="grid gap-space-6">
            <div className="flex items-center justify-between gap-space-16">
              <dt>Shipping cost</dt>
              <dd className="font-medium text-text">
                {formatMoney(deliveryFee)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-space-16">
              <dt>Additional fee</dt>
              <dd className="font-medium text-text">
                {formatMoney(additionalFee)}
              </dd>
            </div>
          </dl>
        ) : null}

        <p
          className={hasDeliveryQuote ? 'mt-space-8 text-12 leading-space-16' : ''}
          aria-live="polite"
        >
          {shippingStatusMessage}
        </p>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="pill"
        className="w-[141px] h-[44px] px-space-32 py-space-13 text-14 leading-space-18"
        disabled={isSubmitDisabled}
      >
        {isSubmitting ? 'Placing...' : 'Place order'}
      </Button>
    </section>
  );
};

export default OrderSummary;
