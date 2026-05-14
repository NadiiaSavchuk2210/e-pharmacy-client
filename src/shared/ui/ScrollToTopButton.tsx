'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SHOW_AFTER_PX = 360;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <Button
      type="button"
      size="icon-lg"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={cn(
        'fixed right-5 bottom-5 z-40 rounded-full border border-button-primary-bg bg-button-primary-bg text-button-primary-text shadow-sm transition-all duration-base ease-base hover:border-button-primary-hover-bg hover:bg-button-primary-hover-bg hover:text-button-primary-text focus-visible:border-button-primary-hover-bg focus-visible:bg-button-primary-hover-bg focus-visible:text-button-primary-text md:right-8 md:bottom-8',
        isVisible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </Button>
  );
};

export default ScrollToTopButton;
