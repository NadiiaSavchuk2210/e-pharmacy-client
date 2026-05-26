import { headerNavigationLinkClassName } from './HeaderNavigation.styles';
import { HeaderNavigationLinks } from './HeaderNavigationLinks';

type HeaderNavigationProps = {
  pathname: string;
};

export const HeaderNavigation = ({ pathname }: HeaderNavigationProps) => {
  return (
    <nav className="hidden xl:block" aria-label="Primary navigation">
      <HeaderNavigationLinks
        pathname={pathname}
        linkClassName={headerNavigationLinkClassName}
      />
    </nav>
  );
};
