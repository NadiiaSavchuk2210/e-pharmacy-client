'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  DESKTOP_PRODUCTS_PER_PAGE,
  PRODUCTS_PER_PAGE,
} from '../medicine.constants';

const DESKTOP_QUERY = '(min-width: 1440px)';

const MedicinePageSizeSync = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);

    const syncLimit = () => {
      const targetLimit = mediaQuery.matches
        ? DESKTOP_PRODUCTS_PER_PAGE
        : PRODUCTS_PER_PAGE;
      const currentLimit = searchParams.get('limit');

      if (currentLimit === String(targetLimit)) {
        return;
      }

      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.set('limit', String(targetLimit));

      router.replace(`${pathname}?${nextSearchParams.toString()}`, {
        scroll: false,
      });
    };

    syncLimit();
    mediaQuery.addEventListener('change', syncLimit);

    return () => mediaQuery.removeEventListener('change', syncLimit);
  }, [pathname, router, searchParams]);

  return null;
};

export default MedicinePageSizeSync;
