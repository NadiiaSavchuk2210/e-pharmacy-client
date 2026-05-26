import { useEffect, useState } from 'react';

export const useHeaderGlass = () => {
  const [isHeaderGlass, setIsHeaderGlass] = useState(false);

  useEffect(() => {
    const updateHeaderGlass = () => {
      setIsHeaderGlass(window.scrollY > 0);
    };

    updateHeaderGlass();

    window.addEventListener('scroll', updateHeaderGlass, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', updateHeaderGlass);
  }, []);

  return isHeaderGlass;
};
