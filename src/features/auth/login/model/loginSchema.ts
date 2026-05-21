import * as Yup from 'yup';

import {
  emailValidation,
  passwordValidation,
} from '../../model/validation/authValidation';

export const loginSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
