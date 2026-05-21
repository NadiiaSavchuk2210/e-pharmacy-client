import { type LoginFormValues } from './loginSchema';
import { type AuthFormFieldName } from '../../api/authTypes';

export const INITIAL_LOGIN_VALUES: LoginFormValues = {
  email: '',
  password: '',
};

type LoginFieldName = AuthFormFieldName<LoginFormValues>;

type LoginFieldConfig = {
  name: LoginFieldName;
  label: string;
  type: 'email' | 'password';
  placeholder: string;
  autoComplete: string;
};

export const LOGIN_FIELDS = [
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'Email address',
    autoComplete: 'email',
  },

  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    autoComplete: 'current-password',
  },
] satisfies LoginFieldConfig[];
