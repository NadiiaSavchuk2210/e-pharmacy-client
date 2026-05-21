import * as Yup from 'yup';

import { PASSWORD_REGEX } from '../../constants/regex';

export const emailValidation = Yup.string()
  .trim()
  .required('Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email must be 254 characters or less');

export const passwordValidation = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(64, 'Password must be 64 characters or less')
  .matches(
    PASSWORD_REGEX,
    'Password must include uppercase, lowercase, number, and symbol',
  );
