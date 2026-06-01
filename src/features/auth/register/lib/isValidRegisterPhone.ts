import { isValidPhoneNumber } from 'libphonenumber-js/min';

import { normalizeRegisterPhone } from './registerPhoneMask';

export const isValidRegisterPhone = (phone: string | undefined) => {
  if (!phone) return false;

  return isValidPhoneNumber(normalizeRegisterPhone(phone));
};
