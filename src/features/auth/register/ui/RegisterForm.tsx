'use client';

import { Field, Form, Formik, type FieldProps } from 'formik';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import {
  registerSchema,
  type RegisterFormValues,
} from '../model/registerSchema';

const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  password: '',
};

const REGISTER_FIELDS = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'User Name',
    autoComplete: 'name',
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'Email address',
    autoComplete: 'email',
  },
  {
    name: 'phone',
    label: 'Phone number',
    type: 'tel',
    placeholder: 'Phone number',
    autoComplete: 'tel',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    autoComplete: 'new-password',
  },
] as const;

const RegisterForm = () => {
  return (
    <Formik<RegisterFormValues>
      initialValues={INITIAL_VALUES}
      validationSchema={registerSchema}
      onSubmit={() => {}}
    >
      <Form
        className="relative w-full max-w-[335px] flex flex-col content-start gap-space-10 md:max-w-[574px] md:flex-row md:flex-wrap md:gap-space-14 lg:pt-[194px] lg:max-w-none lg:flex-1 lg:flex-row"
        noValidate
      >
        {REGISTER_FIELDS.map(({ name, label, ...inputProps }) => (
          <Field key={name} name={name}>
            {({ field, meta }: FieldProps<RegisterFormValues[typeof name]>) => {
              const hasError = Boolean(meta.touched && meta.error);
              const errorId = `${name}-error`;

              return (
                <label className="flex h-[44px] w-full flex-col gap-space-4 text-12 font-medium leading-18 text-text-muted md:w-[17.5rem] lg:w-[calc((100%_-_var(--space-14))_/_2)]">
                  <span className="hidden">{label}</span>
                  <Input
                    {...field}
                    {...inputProps}
                    aria-describedby={hasError ? errorId : undefined}
                    aria-invalid={hasError}
                    className={cn(
                      'w-full',
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
        ))}

        <div className="mt-space-10 mb-1 w-full flex text-14 leading-18 md:mt-12 md:mr-[100%] md:mb-0 md:max-w-[280px] lg:mt-[48px] lg:w-[calc((100%_-_var(--space-14))_/_2)]">
          <Button
            type="submit"
            variant="primary"
            size="primary"
            className="w-full"
          >
            Register
          </Button>
        </div>

        <Link
          href="/login"
          className="w-full text-center text-12 font-normal leading-18 text-text-weak md:max-w-[280px]"
        >
          Already have an account?
        </Link>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
