'use client';

import { Form, Formik, type FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { getAuthFieldErrors } from '../../api/authError';
import { AUTH_PRIVATE_REDIRECT_PATH } from '../../constants/routes';
import { persistAuthToken } from '../../lib/persistAuthToken';
import AuthFormFooter from '../../ui/AuthFormFooter';
import { AUTH_FORM_STYLES } from '../../ui/authFormStyles';
import AuthTextField from '../../ui/AuthTextField';
import AuthValidationNotifier from '../../ui/AuthValidationNotifier';
import { useRegisterMutation, RegisterApiError } from '../api/registerApi';
import {
  formatRegisterPhone,
  normalizeRegisterPhone,
} from '../lib/registerPhoneMask';
import {
  INITIAL_REGISTER_VALUES,
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
      router.push(AUTH_PRIVATE_REDIRECT_PATH);
    } catch (error) {
      if (error instanceof RegisterApiError) {
        setStatus(error.message);
        toast.error(error.message);

        const fieldErrors = getAuthFieldErrors(error.errors);

        if (fieldErrors) {
          setErrors(fieldErrors);
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
        const getFieldFormatting = (
          name: (typeof REGISTER_FIELDS)[number]['name'],
        ) =>
          name === 'phone'
            ? {
                formatValue: formatRegisterPhone,
                normalizeValue: formatRegisterPhone,
              }
            : {};

        return (
          <Form className={AUTH_FORM_STYLES.register.form} noValidate>
            <AuthValidationNotifier />

            {REGISTER_FIELDS.map((field) => (
              <AuthTextField
                key={field.name}
                {...field}
                {...getFieldFormatting(field.name)}
              />
            ))}

            {status && (
              <p
                role="alert"
                className="w-full text-12 font-normal leading-18 text-danger"
              >
                {status}
              </p>
            )}

            <AuthFormFooter
              isSubmitting={isRegistering}
              submitLabel="Register"
              submittingLabel="Registering..."
              navigationHref="/login"
              navigationLabel="Already have an account?"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
