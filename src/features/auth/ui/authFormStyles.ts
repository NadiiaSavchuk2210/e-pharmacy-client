export const AUTH_FORM_STYLES = {
  register: {
    form: 'w-full max-w-[335px] flex flex-col content-start gap-space-10 md:max-w-[574px] md:flex-row md:flex-wrap md:gap-space-14 lg:pt-[194px] lg:max-w-none lg:flex-1 lg:flex-row',
    field: undefined,
  },
  login: {
    form: 'w-full max-w-[335px] flex flex-col content-start gap-space-10 md:w-[323px] md:max-w-[323px] md:flex-col md:flex-nowrap md:gap-space-14 lg:w-[323px] lg:max-w-[323px] lg:flex-none lg:flex-col lg:pt-[194px]',
    field: 'md:w-full lg:w-full',
  },
} as const;

export type AuthFormVariant = keyof typeof AUTH_FORM_STYLES;

export const AUTH_FORM_FOOTER_STYLES = {
  register: {
    submitWrapper:
      'mt-space-10 mb-1 w-full flex text-14 leading-18 md:mt-12 md:mr-[100%] md:mb-0 md:max-w-[280px] lg:mt-[48px] lg:w-[calc((100%_-_var(--space-14))_/_2)]',
    navigationLink:
      'w-full text-center text-12 font-normal leading-18 text-text-weak md:max-w-[280px] lg:w-[calc((100%_-_var(--space-14))_/_2)]',
  },
  login: {
    submitWrapper:
      'mt-[118px] mb-1 w-full flex text-14 leading-18 md:mt-[48px] md:mb-0 md:max-w-full lg:mt-[48px] lg:max-w-full',
    navigationLink:
      'w-full text-center text-12 font-normal leading-18 text-text-weak md:max-w-full lg:max-w-full',
  },
} as const satisfies Record<
  AuthFormVariant,
  {
    submitWrapper: string;
    navigationLink: string;
  }
>;
