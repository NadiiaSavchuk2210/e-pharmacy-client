import type { IconName } from '@/shared/ui/Icon';

type SocialLink = {
  href: string;
  label: string;
  icon: IconName;
};

type FooterLegalLink = {
  href: string;
  label: string;
};

export const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/goITclub/',
    label: 'Facebook',
    icon: 'socials-facebook',
  },
  {
    href: 'https://www.instagram.com/goitclub/',
    label: 'Instagram',
    icon: 'socials-instagram',
  },
  {
    href: 'https://www.youtube.com/c/GoIT',
    label: 'YouTube',
    icon: 'socials-youtube',
  },
] as const satisfies readonly SocialLink[];

export const FOOTER_LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
] as const satisfies readonly FooterLegalLink[];
