import * as Yup from 'yup';

import { NAME_REGEX, PASSWORD_REGEX } from '../../constants/regex';
import { isValidRegisterPhone } from '../lib/isValidRegisterPhone';

export const registerSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email must be 254 characters or less'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be 64 characters or less')
    .matches(
      PASSWORD_REGEX,
      'Password must include uppercase, lowercase, number, and symbol',
    ),

  name: Yup.string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be 60 characters or less')
    .matches(
      NAME_REGEX,
      'Name can include only letters, spaces, hyphens, and apostrophes',
    ),

  phone: Yup.string()
    .trim()
    .required('Phone is required')
    .test(
      'phone-number',
      'phone must be a valid phone number',
      isValidRegisterPhone,
    ),
});

export type RegisterFormValues = Yup.InferType<typeof registerSchema>;
