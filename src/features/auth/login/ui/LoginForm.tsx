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
import { LoginApiError, useLoginMutation } from '../api/loginApi';
import { INITIAL_LOGIN_VALUES, LOGIN_FIELDS } from '../model/loginFormConfig';
import { loginSchema, type LoginFormValues } from '../model/loginSchema';

const LoginForm = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const handleSubmit = async (
    values: LoginFormValues,
    { resetForm, setErrors, setStatus }: FormikHelpers<LoginFormValues>,
  ) => {
    setStatus(undefined);

    try {
      const data = await loginMutation.mutateAsync(values);

      persistAuthToken(data);
      resetForm();
      toast.success('Welcome back!');
      router.push(AUTH_PRIVATE_REDIRECT_PATH);
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
