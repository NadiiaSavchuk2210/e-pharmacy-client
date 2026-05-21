import Link from 'next/link';

import { Button } from '@/components/ui/button';

import {
  AUTH_FORM_FOOTER_STYLES,
  type AuthFormVariant,
} from './authFormStyles';

type AuthFormFooterProps = {
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  navigationHref: string;
  navigationLabel: string;
  variant?: AuthFormVariant;
};

const AuthFormFooter = ({
  isSubmitting,
  submitLabel,
  submittingLabel,
  navigationHref,
  navigationLabel,
  variant = 'register',
}: AuthFormFooterProps) => {
  const styles = AUTH_FORM_FOOTER_STYLES[variant];

  return (
    <>
      <div className={styles.submitWrapper}>
        <Button
          type="submit"
          variant="primary"
          size="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </div>

      <Link
        href={navigationHref}
        className={styles.navigationLink}
      >
        {navigationLabel}
      </Link>
    </>
  );
};

export default AuthFormFooter;
