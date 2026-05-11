import { cn } from '@/lib/utils';

import type { HeaderTone } from './constants';

type MobileMenuButtonProps = {
  isOpen: boolean;
  tone?: Extract<HeaderTone, 'brand' | 'inverse'>;
  onClick: () => void;
};

export const MobileMenuButton = ({
  isOpen,
  tone = 'inverse',
  onClick,
}: MobileMenuButtonProps) => {
  const lineColor = tone === 'inverse' ? 'bg-neutral-0' : 'bg-brand-500';
  const interactiveState =
    tone === 'inverse' || isOpen
      ? 'hover:bg-neutral-0/10 focus-visible:ring-neutral-0/70'
      : 'hover:bg-brand-100 focus-visible:ring-brand-500';
  const lineInteractiveColor =
    isOpen
      ? 'group-hover:bg-brand-700 group-focus-visible:bg-brand-700'
      : tone === 'inverse'
        ? 'group-hover:bg-neutral-100 group-focus-visible:bg-neutral-100'
        : 'group-hover:bg-brand-700 group-focus-visible:bg-brand-700';

  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-controls="mobile-menu"
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(
        'group z-[60] flex size-8 cursor-pointer items-center justify-center rounded-full transition-[background-color,box-shadow,transform] duration-base ease-base xl:hidden',
        'focus-visible:outline-none focus-visible:ring-[0.1875rem] active:scale-95',
        interactiveState,
        isOpen ? 'fixed right-[1.25rem] top-[1.9375rem]' : 'relative',
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          'absolute h-0.5 w-8 rounded-full transition-[background-color,opacity,transform] duration-base ease-base group-hover:opacity-90',
          lineColor,
          lineInteractiveColor,
          isOpen ? 'translate-y-0 rotate-45 bg-neutral-0' : '-translate-y-2',
        )}
      />
      <span
        className={cn(
          'absolute h-0.5 w-8 rounded-full transition-[background-color,opacity,transform] duration-base ease-base group-hover:opacity-90',
          lineColor,
          lineInteractiveColor,
          isOpen && 'scale-x-0 opacity-0',
        )}
      />
      <span
        className={cn(
          'absolute h-0.5 w-8 rounded-full transition-[background-color,opacity,transform] duration-base ease-base group-hover:opacity-90',
          lineColor,
          lineInteractiveColor,
          isOpen ? 'translate-y-0 -rotate-45 bg-neutral-0' : 'translate-y-2',
        )}
      />
    </button>
  );
};
