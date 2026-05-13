'use client';

import {
  Field,
  Form,
  Formik,
  type FieldProps,
  type FormikHelpers,
} from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import RegisterValidationNotifier from './RegisterValidationNotifier';
import { useRegisterMutation, RegisterApiError } from '../api/registerApi';
import { persistAuthToken } from '../lib/persistAuthToken';
import {
  formatRegisterPhone,
  normalizeRegisterPhone,
} from '../lib/registerPhoneMask';
import {
  INITIAL_REGISTER_VALUES,
  PRIVATE_REDIRECT_PATH,
  REGISTER_FIELDS,
} from '../model/registerFormConfig';
import {
  registerSchema,
  type RegisterFormValues,
} from '../model/registerSchema';

const RegisterForm = () => {
  const router = useRouter();
  const registerMutation = useRegisterMutation();

  const handleSubmit = async (
    values: RegisterFormValues,
    { resetForm, setErrors, setStatus }: FormikHelpers<RegisterFormValues>,
  ) => {
    setStatus(undefined);

    try {
      const data = await registerMutation.mutateAsync({
        ...values,
        phone: normalizeRegisterPhone(values.phone),
      });

      persistAuthToken(data);
      resetForm();
      toast.success('Your account has been created. Welcome!');
      router.push(PRIVATE_REDIRECT_PATH);
    } catch (error) {
      if (error instanceof RegisterApiError) {
        setStatus(error.message);
        toast.error(error.message);

        if (error.errors) {
          setErrors(error.errors);
        }

        return;
      }

      const fallbackMessage = 'Something went wrong. Please try again.';

      setStatus(fallbackMessage);
      toast.error(fallbackMessage);
    }
  };

  return (
    <Formik<RegisterFormValues>
      initialValues={INITIAL_REGISTER_VALUES}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => {
        const isRegistering = isSubmitting || registerMutation.isPending;

        return (
          <Form
            className=" w-full max-w-[335px] flex flex-col content-start gap-space-10 md:max-w-[574px] md:flex-row md:flex-wrap md:gap-space-14 lg:pt-[194px] lg:max-w-none lg:flex-1 lg:flex-row"
            noValidate
          >
            <RegisterValidationNotifier />

            {REGISTER_FIELDS.map(({ name, label, ...inputProps }) => (
              <Field key={name} name={name}>
                {({
                  field,
                  form,
                  meta,
                }: FieldProps<RegisterFormValues[typeof name]>) => {
                  const hasError = Boolean(meta.touched && meta.error);
                  const errorId = `${name}-error`;
                  const fieldProps =
                    name === 'phone'
                      ? {
                          ...field,
                          value: formatRegisterPhone(field.value),
                          onChange: (
                            event: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            form.setFieldValue(
                              name,
                              formatRegisterPhone(event.target.value),
                            );
                          },
                        }
                      : field;

                  return (
                    <label className="flex w-full flex-col gap-space-4 text-12 font-medium leading-18 text-text-muted md:w-[17.5rem] lg:w-[calc((100%_-_var(--space-14))_/_2)]">
                      <span className="hidden">{label}</span>
                      <Input
                        {...fieldProps}
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

            {status && (
              <p
                role="alert"
                className="w-full text-12 font-normal leading-18 text-danger"
              >
                {status}
              </p>
            )}

            <div className="mt-space-10 mb-1 w-full flex text-14 leading-18 md:mt-12 md:mr-[100%] md:mb-0 md:max-w-[280px] lg:mt-[48px] lg:w-[calc((100%_-_var(--space-14))_/_2)]">
              <Button
                type="submit"
                variant="primary"
                size="primary"
                className="w-full"
                disabled={isRegistering}
              >
                {isRegistering ? 'Registering...' : 'Register'}
              </Button>
            </div>

            <Link
              href="/login"
              className="w-full text-center text-12 font-normal leading-18 text-text-weak md:max-w-[280px] lg:w-[calc((100%_-_var(--space-14))_/_2)]"
            >
              Already have an account?
            </Link>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
