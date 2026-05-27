'use client';

import { useFormikContext } from 'formik';

import { Label } from '@/components/ui/label';
import type { PaymentMethod } from '@/entities/order';
import { cn } from '@/lib/utils';

import { CART_PAYMENT_OPTIONS } from '../../model';
import {
  cartCheckoutSectionDescriptionClassName,
  cartCheckoutSectionTitleClassName,
} from '../cartCheckoutSection.styles';

import type { CartCheckoutFormValues } from '../../model';

const PAYMENT_METHOD_ERROR_ID = 'cart-payment-method-error';
const PAYMENT_METHOD_DESCRIPTION_ID = 'cart-payment-method-description';

const PaymentMethodSection = () => {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext<CartCheckoutFormValues>();
  const error =
    touched.paymentMethod && typeof errors.paymentMethod === 'string'
      ? errors.paymentMethod
      : undefined;

  const handlePaymentMethodChange = (paymentMethod: PaymentMethod) => {
    void setFieldValue('paymentMethod', paymentMethod);
    void setFieldTouched('paymentMethod', true, false);
  };
  const describedBy = error
    ? `${PAYMENT_METHOD_DESCRIPTION_ID} ${PAYMENT_METHOD_ERROR_ID}`
    : PAYMENT_METHOD_DESCRIPTION_ID;

  return (
    <fieldset className="m-0 border-0 p-0" aria-describedby={describedBy}>
      <legend
        className={cn(
          cartCheckoutSectionTitleClassName,
          'mb-space-12 md:mb-space-14',
        )}
      >
        Payment method
      </legend>
      <p
        id={PAYMENT_METHOD_DESCRIPTION_ID}
        className={cn(cartCheckoutSectionDescriptionClassName, 'mb-space-20')}
      >
        You can pay us in a multiple way in our payment gateway system.
      </p>

      <div className="flex flex-col gap-space-8">
        {CART_PAYMENT_OPTIONS.map((option) => (
          <Label
            key={option.value}
            className={cn(
              'w-fit cursor-pointer gap-space-10 text-14 font-normal leading-space-18 transition-colors',
              values.paymentMethod === option.value
                ? 'text-text'
                : 'text-text-muted hover:text-text',
            )}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.value}
              checked={values.paymentMethod === option.value}
              className="peer sr-only"
              aria-describedby={error ? PAYMENT_METHOD_ERROR_ID : undefined}
              onChange={() => handlePaymentMethodChange(option.value)}
            />
            <span
              aria-hidden="true"
              className={cn(
                'relative size-5 shrink-0 rounded-full border-[2px] transition-[border-color,box-shadow] duration-fast ease-fast peer-focus-visible:ring-[3px] peer-focus-visible:ring-brand-500/25',
                values.paymentMethod === option.value
                  ? 'border-brand-500 after:absolute after:left-1/2 after:top-1/2 after:size-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-brand-500 after:content-[""]'
                  : 'border-neutral-300 bg-surface',
              )}
            />
            {option.label}
          </Label>
        ))}
      </div>

      {error ? (
        <p
          id={PAYMENT_METHOD_ERROR_ID}
          role="alert"
          className="mt-space-8 text-12 leading-space-18 text-danger"
        >
          {error}
        </p>
      ) : null}
    </fieldset>
  );
};

export default PaymentMethodSection;
