import { useEffect, useState } from 'react';

export const useHeaderGlass = () => {
  const [isHeaderGlass, setIsHeaderGlass] = useState(false);

  useEffect(() => {
    let animationFrameId = 0;
    let previousHeaderGlass = false;

    const updateHeaderGlass = () => {
      const nextHeaderGlass = window.scrollY > 0;

      if (nextHeaderGlass === previousHeaderGlass) {
        return;
      }

      previousHeaderGlass = nextHeaderGlass;
      setIsHeaderGlass(nextHeaderGlass);
    };

    const scheduleHeaderGlassUpdate = () => {
      if (animationFrameId) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = 0;
        updateHeaderGlass();
      });
    };

    updateHeaderGlass();

    window.addEventListener('scroll', scheduleHeaderGlassUpdate, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', scheduleHeaderGlassUpdate);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return isHeaderGlass;
};
