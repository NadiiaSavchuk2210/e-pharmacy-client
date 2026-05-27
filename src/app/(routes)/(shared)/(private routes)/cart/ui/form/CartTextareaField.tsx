'use client';

import { useField } from 'formik';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { CART_COMMENT_MAX_LENGTH } from '../../model';

type CartTextareaFieldProps = {
  name: 'comment';
  id: string;
  label: string;
  placeholder?: string;
  className?: string;
  textareaClassName?: string;
};

const CartTextareaField = ({
  name,
  id,
  label,
  placeholder = 'Enter text',
  className,
  textareaClassName,
}: CartTextareaFieldProps) => {
  const [field, meta] = useField<string>(name);
  const hasError = Boolean(meta.touched && meta.error);
  const errorId = `${id}-error`;

  return (
    <div className={cn('flex flex-col gap-space-8', className)}>
      <Label
        htmlFor={id}
        className="pl-space-18 text-14 font-semibold leading-space-18"
      >
        {label}
      </Label>
      <textarea
        {...field}
        id={id}
        rows={4}
        maxLength={CART_COMMENT_MAX_LENGTH}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError}
        placeholder={placeholder}
        className={cn(
          'w-full resize-none rounded-[1.375rem] border border-input-border bg-input-bg px-[1.125rem] py-[0.8125rem] text-12 leading-[1.5] text-text outline-none transition-[border-color,box-shadow] duration-fast ease-fast placeholder:text-text-weak hover:border-input-border-focus focus-visible:border-input-border-focus focus-visible:ring-[3px] focus-visible:ring-input-border-focus/20 aria-invalid:border-danger aria-invalid:hover:border-danger aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger/20',
          textareaClassName,
        )}
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

export default CartTextareaField;
