'use client';

import { Field, type FieldProps } from 'formik';
import { type ChangeEvent, type ComponentProps } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type AuthFieldConfig<TFieldName extends string = string> = {
  name: TFieldName;
  label: string;
  type: ComponentProps<'input'>['type'];
  placeholder: string;
  autoComplete: string;
};

type AuthTextFieldProps<TFieldName extends string> =
  AuthFieldConfig<TFieldName> & {
    formatValue?: (value: string) => string;
    normalizeValue?: (value: string) => string;
    className?: string;
    inputClassName?: string;
  };

const AuthTextField = <TFieldName extends string>({
  name,
  label,
  formatValue,
  normalizeValue,
  className,
  inputClassName,
  ...inputProps
}: AuthTextFieldProps<TFieldName>) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps<string>) => {
        const hasError = Boolean(meta.touched && meta.error);
        const errorId = `${name}-error`;
        const fieldProps = {
          ...field,
          value: formatValue ? formatValue(field.value) : field.value,
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            const value = normalizeValue
              ? normalizeValue(event.target.value)
              : event.target.value;

            form.setFieldValue(name, value);
          },
        };

        return (
          <label
            className={cn(
              'flex w-full flex-col gap-space-4 text-12 font-medium leading-18 text-text-muted md:w-[17.5rem] lg:w-[calc((100%_-_var(--space-14))_/_2)]',
              className,
            )}
          >
            <span className="sr-only">{label}</span>
            <Input
              {...fieldProps}
              {...inputProps}
              aria-describedby={hasError ? errorId : undefined}
              aria-invalid={hasError}
              className={cn(
                'w-full',
                inputClassName,
                hasError &&
                  'border-danger bg-danger-soft text-danger placeholder:text-danger/70 focus:border-danger',
              )}
            />
            {hasError && (
              <span
                id={errorId}
                role="alert"
                className="text-12 font-normal leading-18 text-danger"
              >
                {meta.error}
              </span>
            )}
          </label>
        );
      }}
    </Field>
  );
};

export default AuthTextField;
