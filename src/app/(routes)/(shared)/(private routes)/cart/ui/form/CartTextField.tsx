'use client';

import { useField } from 'formik';
import { type ChangeEvent } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import type { CartCheckoutFormValues } from '../../model';

type CartTextFieldName = Extract<
  keyof CartCheckoutFormValues,
  'address' | 'email' | 'name' | 'phone'
>;

type CartTextFieldProps = {
  name: CartTextFieldName;
  id: string;
  label: string;
  type?: 'email' | 'tel' | 'text';
  autoComplete?: string;
  className?: string;
  formatValue?: (value: string) => string;
  inputClassName?: string;
  normalizeValue?: (value: string) => string;
  placeholder?: string;
};

const CartTextField = ({
  name,
  id,
  label,
  type = 'text',
  autoComplete,
  className,
  formatValue,
  inputClassName = 'h-10 text-12 leading-space-18 md:h-[44px]',
  normalizeValue,
  placeholder = 'Enter text',
}: CartTextFieldProps) => {
  const [field, meta, helpers] = useField<string>(name);
  const hasError = Boolean(meta.touched && meta.error);
  const errorId = `${id}-error`;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeValue
      ? normalizeValue(event.target.value)
      : event.target.value;

    helpers.setValue(value);
  };

  return (
    <div className={cn('flex flex-col gap-space-8', className)}>
      <Label
        htmlFor={id}
        className="pl-space-18 text-14 font-semibold leading-space-18"
      >
        {label}
      </Label>
      <Input
        {...field}
        id={id}
        type={type}
        value={formatValue ? formatValue(field.value) : field.value}
        autoComplete={autoComplete}
        required
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError}
        placeholder={placeholder}
        className={inputClassName}
        onChange={handleChange}
      />
      {hasError ? (
        <p
          id={errorId}
          role="alert"
          className="text-12 leading-space-18 text-danger"
        >
          {meta.error}
        </p>
      ) : null}
    </div>
  );
};

export default CartTextField;
