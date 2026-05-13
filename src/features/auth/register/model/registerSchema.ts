import * as Yup from 'yup';

import { NAME_REGEX } from '../../constants/regex';
import { emailValidation, passwordValidation } from '../../model/authValidation';
import { isValidRegisterPhone } from '../lib/isValidRegisterPhone';

export const registerSchema = Yup.object({
  email: emailValidation,

  password: passwordValidation,

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
