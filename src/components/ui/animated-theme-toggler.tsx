'use client';

import { Moon, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';

import type { MouseEvent } from 'react';

type Theme = 'dark' | 'light';
type TransitionVariant =
  | 'circle'
  | 'diamond'
  | 'hexagon'
  | 'rectangle'
  | 'square'
  | 'star'
  | 'triangle';

type AnimatedThemeTogglerProps = {
  className?: string;
  duration?: number;
  fromCenter?: boolean;
  tone?: 'default' | 'inverse';
  variant?: TransitionVariant;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    ready: Promise<void>;
  };
};

const THEME_STORAGE_KEY = 'theme';

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getCurrentTheme = (): Theme => {
  if (typeof document === 'undefined') return 'light';

  const savedTheme = document.documentElement.dataset.theme;

  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;

  return getSystemTheme();
};

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

const getClipPath = (
  variant: TransitionVariant,
  radius: number,
  x: number,
  y: number,
) => {
  if (variant === 'square') {
    return [
      `inset(${y}px ${window.innerWidth - x}px ${window.innerHeight - y}px ${x}px)`,
      'inset(0 0 0 0)',
    ];
  }

  if (variant === 'rectangle') {
    return [
      `inset(${y - 1}px ${window.innerWidth - x - 1}px ${window.innerHeight - y - 1}px ${x - 1}px round 0.75rem)`,
      'inset(0 0 0 0 round 0rem)',
    ];
  }

  if (variant === 'triangle') {
    return [
      `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
      `polygon(50% -20%, -20% 120%, 120% 120%)`,
    ];
  }

  if (variant === 'diamond') {
    return [
      `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
      `polygon(50% -30%, 130% 50%, 50% 130%, -30% 50%)`,
    ];
  }

  if (variant === 'hexagon') {
    return [
      `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
      `polygon(25% -20%, 75% -20%, 120% 50%, 75% 120%, 25% 120%, -20% 50%)`,
    ];
  }

  if (variant === 'star') {
    return [
      `polygon(${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px, ${x}px ${y}px)`,
      `polygon(50% -20%, 62% 32%, 118% 32%, 72% 62%, 88% 118%, 50% 82%, 12% 118%, 28% 62%, -18% 32%, 38% 32%)`,
    ];
  }

  return [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${radius}px at ${x}px ${y}px)`,
  ];
};

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  fromCenter = false,
  tone = 'default',
  variant = 'circle',
}: AnimatedThemeTogglerProps) => {
  const handleToggle = async (event: MouseEvent<HTMLButtonElement>) => {
    const theme = getCurrentTheme();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = fromCenter ? window.innerWidth / 2 : rect.left + rect.width / 2;
    const y = fromCenter ? window.innerHeight / 2 : rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const transitionDocument = document as ViewTransitionDocument;
    const updateTheme = () => {
      applyTheme(nextTheme);
    };

    if (!transitionDocument.startViewTransition) {
      updateTheme();
      return;
    }

    const transition = transitionDocument.startViewTransition(updateTheme);

    try {
      await transition.ready;
      const clipPath = getClipPath(variant, endRadius, x, y);

      document.documentElement.animate(
        { clipPath },
        {
          duration,
          easing: 'ease-in-out',
          pseudoElement: `::view-transition-new(root)`,
        },
      );
    } catch {
      return;
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      className={cn(
        'relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-[background-color,border-color,color,box-shadow,transform] duration-base ease-base hover:shadow-md active:scale-95 max-[479px]:size-8 md:size-11',
        'cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-offset-[0.1875rem]',
        tone === 'inverse'
          ? 'border-white/45 bg-transparent text-white hover:border-white hover:bg-white hover:text-brand-700 focus-visible:ring-white/75 focus-visible:ring-offset-bg'
          : 'border-card-border bg-surface text-text hover:border-accent hover:text-accent focus-visible:ring-accent/45 focus-visible:ring-offset-bg',
        className,
      )}
      onClick={handleToggle}
    >
      <Sun
        aria-hidden="true"
        className={cn(
          'absolute size-4 transition-[rotate,scale,opacity] duration-base ease-base',
          'rotate-0 scale-100 opacity-100 dark:rotate-90 dark:scale-0 dark:opacity-0',
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          'absolute size-4 transition-[rotate,scale,opacity] duration-base ease-base',
          '-rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100',
        )}
      />
    </button>
  );
};

export type { TransitionVariant };
