import { formatRegisterPhone } from '@/features/auth/register/lib/registerPhoneMask';

import CartTextareaField from './CartTextareaField';
import CartTextField from './CartTextField';
import {
  cartCheckoutSectionDescriptionClassName,
  cartCheckoutSectionTitleClassName,
} from '../cartCheckoutSection.styles';

const ShippingInfoSection = () => {
  return (
    <section
      className="flex flex-col gap-space-40 max-[374px]:gap-space-32"
      aria-labelledby="cart-shipping-heading"
    >
      <div className="flex flex-col gap-space-12 lg:gap-space-14">
        <h2
          id="cart-shipping-heading"
          className={cartCheckoutSectionTitleClassName}
        >
          Enter shipping info
        </h2>
        <p className={cartCheckoutSectionDescriptionClassName}>
          Enter your delivery address where you get the product. You can also
          send any other location where you send the products.
        </p>
      </div>

      <div className="grid gap-space-12 md:grid-cols-2 md:gap-x-space-14 md:gap-y-space-20 md:max-w-[534px]">
        <CartTextField
          id="cart-shipping-name"
          name="name"
          label="Name"
          autoComplete="name"
        />

        <CartTextField
          id="cart-shipping-email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
        />

        <CartTextField
          id="cart-shipping-phone"
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          formatValue={formatRegisterPhone}
          normalizeValue={formatRegisterPhone}
        />

        <CartTextField
          id="cart-shipping-address"
          name="address"
          label="Address"
          autoComplete="shipping street-address"
        />
      </div>

      <CartTextareaField id="cart-comment" name="comment" label="Comment" />
    </section>
  );
};

export default ShippingInfoSection;
