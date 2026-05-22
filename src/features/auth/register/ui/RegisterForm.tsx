'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { getAuthFieldErrors } from '../../api/authError';
import {
  AUTH_PRIVATE_REDIRECT_PATH,
  getSafeAuthRedirect,
} from '../../constants/routes';
import { saveAuthSession } from '../../model/session/authState';
import AuthFormFooter, {
  type AuthFormFooterClassNames,
} from '../../ui/form/AuthFormFooter';
import { AUTH_FORM_STYLES } from '../../ui/form/authFormStyles';
import AuthTextField from '../../ui/form/AuthTextField';
import AuthValidationNotifier from '../../ui/form/AuthValidationNotifier';
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

type RegisterFormProps = {
  redirectPath?: string;
  onAuthSuccess?: () => void;
  onNavigateToLogin?: () => void;
  navigationHref?: string;
  navigationLabel?: string;
  submitLabel?: string;
  submittingLabel?: string;
  formClassName?: string;
  fieldClassName?: string;
  inputClassName?: string;
  footerClassNames?: AuthFormFooterClassNames;
};

const RegisterForm = ({
  redirectPath,
  onAuthSuccess,
  onNavigateToLogin,
  navigationHref = '/login',
  navigationLabel = 'Log in',
  submitLabel = 'Register',
  submittingLabel = 'Registering...',
  formClassName,
  fieldClassName,
  inputClassName,
  footerClassNames,
}: RegisterFormProps = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
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
      const safeRedirectPath = getSafeAuthRedirect(
        redirectPath ?? searchParams.get('redirect'),
        AUTH_PRIVATE_REDIRECT_PATH,
      );

      saveAuthSession(queryClient, data);
      resetForm();
      toast.success('Your account has been created. Welcome!');
      onAuthSuccess?.();
      router.replace(safeRedirectPath);
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
          <Form
            className={formClassName ?? AUTH_FORM_STYLES.register.form}
            noValidate
          >
            <AuthValidationNotifier />

            {REGISTER_FIELDS.map((field) => (
              <AuthTextField
                key={field.name}
                {...field}
                {...getFieldFormatting(field.name)}
                className={fieldClassName}
                inputClassName={inputClassName}
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
              submitLabel={submitLabel}
              submittingLabel={submittingLabel}
              navigationLabel={navigationLabel}
              classNames={footerClassNames}
              {...(onNavigateToLogin
                ? { onNavigationClick: onNavigateToLogin }
                : { navigationHref })}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
