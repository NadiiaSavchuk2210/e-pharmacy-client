import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef } from 'react';

export const ICON_NAMES = [
  'map-pin',
  'phone',
  'socials-facebook',
  'socials-instagram',
  'socials-youtube',
  'minus',
  'plus',
  'star',
  'shopping-cart',
  'lightning',
  'cross',
  'burger',
  'lines',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

type IconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children' | 'name'> & {
  name: IconName;
  title?: string;
};

const ICON_SPRITE_PATH = '/icons/icons.svg';

export const Icon = ({
  name,
  title,
  className,
  focusable = false,
  ...props
}: IconProps) => {
  const isDecorative = !title;

  return (
    <svg
      aria-hidden={isDecorative}
      aria-label={title}
      focusable={focusable}
      role={isDecorative ? undefined : 'img'}
      className={cn('size-6 shrink-0 fill-current stroke-current', className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <use href={`${ICON_SPRITE_PATH}#icon-${name}`} />
    </svg>
  );
};
