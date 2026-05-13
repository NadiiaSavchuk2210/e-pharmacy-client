import * as Yup from 'yup';

import { NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '../../constants/regex';

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
    .matches(
      PHONE_REGEX,
      'Phone can include only numbers, spaces, brackets, hyphens, and +',
    )
    .test('phone-digits', 'Phone must contain 10 to 15 digits', (value) => {
      const digits = value?.replace(/\D/g, '') ?? '';

      return digits.length >= 10 && digits.length <= 15;
    }),
});

export type RegisterFormValues = Yup.InferType<typeof registerSchema>;
