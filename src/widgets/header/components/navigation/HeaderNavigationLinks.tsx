import { cn } from '@/lib/utils';
import { NavigationLinks } from '@/shared/navigation/components/NavigationLinks';

import {
  getHeaderNavigationLinkClassName,
  headerNavigationItemClassNames,
  headerNavigationListClassNames,
  type HeaderNavigationOrientation,
} from './HeaderNavigation.styles';

type HeaderNavigationLinksProps = {
  pathname: string;
  className?: string;
  itemClassName?: string;
  linkClassName?: string;
  onNavigate?: () => void;
  orientation?: HeaderNavigationOrientation;
};

export const HeaderNavigationLinks = ({
  pathname,
  className,
  itemClassName,
  linkClassName,
  onNavigate,
  orientation = 'horizontal',
}: HeaderNavigationLinksProps) => {
  const isVertical = orientation === 'vertical';

  return (
    <NavigationLinks
      pathname={pathname}
      className={cn(
        'flex',
        headerNavigationListClassNames[orientation],
        className,
      )}
      itemClassName={cn(
        headerNavigationItemClassNames[orientation],
        itemClassName,
      )}
      linkClassName={(_, { isActive }) =>
        cn(
          getHeaderNavigationLinkClassName({ isActive, isVertical }),
          linkClassName,
        )
      }
      labelClassName="relative z-10"
      onNavigate={onNavigate}
    />
  );
};
