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
import AuthFormFooter from '../../ui/form/AuthFormFooter';
import { AUTH_FORM_STYLES } from '../../ui/form/authFormStyles';
import AuthTextField from '../../ui/form/AuthTextField';
import AuthValidationNotifier from '../../ui/form/AuthValidationNotifier';
import { LoginApiError, useLoginMutation } from '../api/loginApi';
import { INITIAL_LOGIN_VALUES, LOGIN_FIELDS } from '../model/loginFormConfig';
import { loginSchema, type LoginFormValues } from '../model/loginSchema';

const LoginForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLoginMutation();

  const handleSubmit = async (
    values: LoginFormValues,
    { resetForm, setErrors, setStatus }: FormikHelpers<LoginFormValues>,
  ) => {
    setStatus(undefined);

    try {
      const data = await loginMutation.mutateAsync(values);
      const redirectPath = getSafeAuthRedirect(
        searchParams.get('redirect'),
        AUTH_PRIVATE_REDIRECT_PATH,
      );

      saveAuthSession(queryClient, data);
      resetForm();
      toast.success('Welcome back!');
      router.replace(redirectPath);
    } catch (error) {
      if (error instanceof LoginApiError) {
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
    <Formik<LoginFormValues>
      initialValues={INITIAL_LOGIN_VALUES}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => {
        const isLoggingIn = isSubmitting || loginMutation.isPending;

        return (
          <Form className={AUTH_FORM_STYLES.login.form} noValidate>
            <AuthValidationNotifier />

            {LOGIN_FIELDS.map((field) => (
              <AuthTextField
                key={field.name}
                {...field}
                className={AUTH_FORM_STYLES.login.field}
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
              isSubmitting={isLoggingIn}
              submitLabel="Log in"
              submittingLabel="Logging in..."
              navigationHref="/register"
              navigationLabel="Don't have an account?"
              variant="login"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
