const REGISTER_PHONE_COUNTRY_CODE = '380';
const REGISTER_PHONE_PREFIX = `+${REGISTER_PHONE_COUNTRY_CODE}`;
const REGISTER_PHONE_NATIONAL_DIGITS_LIMIT = 9;

const isDeletingPhonePrefix = (value: string) => {
  const trimmedValue = value.trim();

  return (
    trimmedValue.startsWith('+') &&
    trimmedValue !== REGISTER_PHONE_PREFIX &&
    REGISTER_PHONE_PREFIX.startsWith(trimmedValue)
  );
};

const trimNationalPhoneDigits = (digits: string) => {
  if (digits.startsWith(REGISTER_PHONE_COUNTRY_CODE)) {
    return digits.slice(REGISTER_PHONE_COUNTRY_CODE.length);
  }

  if (digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
};

export const formatRegisterPhone = (value: string) => {
  if (!value.trim() || isDeletingPhonePrefix(value)) {
    return '';
  }

  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  const nationalDigits = trimNationalPhoneDigits(digits).slice(
    0,
    REGISTER_PHONE_NATIONAL_DIGITS_LIMIT,
  );

  const parts = [
    nationalDigits.slice(0, 2),
    nationalDigits.slice(2, 5),
    nationalDigits.slice(5, 7),
    nationalDigits.slice(7, 9),
  ].filter(Boolean);

  return [REGISTER_PHONE_PREFIX, ...parts].join(' ');
};

export const normalizeRegisterPhone = (value: string) => {
  return formatRegisterPhone(value).replace(/\s/g, '');
};
