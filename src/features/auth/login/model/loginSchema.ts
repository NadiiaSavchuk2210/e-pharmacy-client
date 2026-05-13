import * as Yup from 'yup';

import {
  emailValidation,
  passwordValidation,
} from '../../model/authValidation';

export const loginSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;
