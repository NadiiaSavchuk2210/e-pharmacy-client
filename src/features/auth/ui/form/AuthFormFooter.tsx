import Link from 'next/link';

import { Button } from '@/components/ui/button';

import {
  AUTH_FORM_FOOTER_STYLES,
  type AuthFormVariant,
} from './authFormStyles';

export type AuthFormFooterClassNames = Partial<{
  submitWrapper: string;
  submitButton: string;
  navigationLink: string;
}>;

type AuthFormFooterBaseProps = {
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  navigationLabel: string;
  variant?: AuthFormVariant;
  classNames?: AuthFormFooterClassNames;
};

type AuthFormFooterProps = AuthFormFooterBaseProps &
  (
    | {
        navigationHref: string;
        onNavigationClick?: undefined;
      }
    | {
        navigationHref?: undefined;
        onNavigationClick: () => void;
      }
  );

const DEFAULT_AUTH_SUBMIT_BUTTON_CLASS =
  'w-full bg-brand-700 hover:bg-brand-600 focus-visible:bg-brand-700 active:bg-brand-700';

const AuthFormFooter = (props: AuthFormFooterProps) => {
  const {
    isSubmitting,
    submitLabel,
    submittingLabel,
    navigationLabel,
    variant = 'register',
    classNames,
  } = props;
  const styles = AUTH_FORM_FOOTER_STYLES[variant];
  const navigationClassName =
    classNames?.navigationLink ?? styles.navigationLink;

  return (
    <>
      <div className={classNames?.submitWrapper ?? styles.submitWrapper}>
        <Button
          type="submit"
          variant="primary"
          size="primary"
          className={
            classNames?.submitButton ?? DEFAULT_AUTH_SUBMIT_BUTTON_CLASS
          }
          disabled={isSubmitting}
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </div>

      {props.onNavigationClick ? (
        <button
          type="button"
          className={navigationClassName}
          onClick={props.onNavigationClick}
        >
          {navigationLabel}
        </button>
      ) : (
        <Link
          href={props.navigationHref}
          className={navigationClassName}
        >
          {navigationLabel}
        </Link>
      )}
    </>
  );
};

export default AuthFormFooter;
