import Link from 'next/link';

import { Icon } from '@/shared/ui/Icon';

import { SOCIAL_LINKS } from '../constants';

interface FooterSocialLinksProps {
  className?: string;
}

const FooterSocialLinks = ({ className }: FooterSocialLinksProps) => {
  return (
    <ul className={className}>
      {SOCIAL_LINKS.map(({ href, label, icon }) => (
        <li key={href}>
          <Link
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="group flex size-11 items-center justify-center rounded-[0.625rem] border border-border-inverse-soft text-text-inverse transition duration-base ease-base hover:border-border-inverse-hover hover:bg-neutral-0/10 focus-visible:border-border-inverse-hover focus-visible:bg-neutral-0/10 focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-neutral-0 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-header-brand-bg active:scale-95"
          >
            <Icon
              name={icon}
              className="size-7 fill-neutral-50 transition duration-base ease-base group-hover:fill-neutral-0 group-focus-visible:fill-neutral-0"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterSocialLinks;
