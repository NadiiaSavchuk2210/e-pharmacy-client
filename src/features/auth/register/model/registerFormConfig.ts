import { type RegisterFormValues } from './registerSchema';
import { type AuthFormFieldName } from '../../api/authTypes';

export const INITIAL_REGISTER_VALUES: RegisterFormValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
};

type RegisterFieldName = AuthFormFieldName<RegisterFormValues>;

type RegisterFieldConfig = {
  name: RegisterFieldName;
  label: string;
  type: 'text' | 'email' | 'tel' | 'password';
  placeholder: string;
  autoComplete: string;
};

export const REGISTER_FIELDS = [
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
] satisfies RegisterFieldConfig[];
