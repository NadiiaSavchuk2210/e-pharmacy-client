import { CreditCard, MapPin } from 'lucide-react';

import type { PaymentMethod, ShippingInfo } from '@/entities/order';

import { getPaymentMethodLabel } from '../../lib';

type OrderMetaDetailsProps = {
  paymentMethod: PaymentMethod;
  shippingInfo: ShippingInfo;
};

const OrderMetaDetails = ({
  paymentMethod,
  shippingInfo,
}: OrderMetaDetailsProps) => {
  return (
    <aside className="grid content-start gap-space-18 text-14 leading-space-20">
      <div>
        <div className="mb-space-10 flex items-center gap-space-8 font-semibold text-text">
          <CreditCard className="size-4 text-brand-500" aria-hidden="true" />
          Payment
        </div>
        <p className="text-text-muted">{getPaymentMethodLabel(paymentMethod)}</p>
      </div>

      <div className="border-t border-card-border pt-space-18">
        <div className="mb-space-10 flex items-center gap-space-8 font-semibold text-text">
          <MapPin className="size-4 text-brand-500" aria-hidden="true" />
          Delivery
        </div>
        <p className="text-text">{shippingInfo.name}</p>
        <p className="mt-space-4 text-text-muted">{shippingInfo.address}</p>
        <p className="mt-space-4 text-text-muted">{shippingInfo.phone}</p>
      </div>
    </aside>
  );
};

export default OrderMetaDetails;
