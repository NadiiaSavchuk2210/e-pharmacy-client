import Link from 'next/link';

import { cn } from '@/lib/utils';

import MedicineStoreCardContent from './MedicineStoreCardContent';

import type { MedicineStore } from '../model/types';

type MedicineStoreCardProps = {
  store: MedicineStore;
  showVisitButton?: boolean;
};

const cardClassName =
  'group relative h-[202px] w-full max-w-[335px] overflow-hidden rounded-[27px] border-[1.15px] border-card-border bg-card-bg shadow-sm transition-[scale,background-color,border-color,box-shadow] duration-[650ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.02] hover:border-accent hover:bg-accent-soft hover:shadow-md focus-within:scale-[1.02] focus-within:border-accent focus-within:bg-accent-soft focus-within:shadow-md md:h-[232px] md:max-w-none md:w-[calc((100%_-_var(--space-16))_/_2)] lg:w-[calc((100%_-_72px)_/_3)]';

const getCardClassName = (showVisitButton: boolean) =>
  cn(
    cardClassName,
    showVisitButton &&
      'md:h-[276px] lg:h-[276px] lg:w-[calc((100%_-_var(--space-40))_/_3)]',
  );

const getContentClassName = (showVisitButton: boolean) =>
  cn('relative z-10 block h-full p-space-40', showVisitButton && 'p-space-40');

const MedicineStoreCard = ({
  store,
  showVisitButton = false,
}: MedicineStoreCardProps) => {
  const href = `/medicine-store/${store.id}`;
  const content = (
    <MedicineStoreCardContent
      href={href}
      store={store}
      showVisitButton={showVisitButton}
    />
  );

  if (!showVisitButton) {
    return (
      <li className={getCardClassName(showVisitButton)}>
        <Link
          href={href}
          className={cn(
            getContentClassName(showVisitButton),
            'cursor-pointer focus-visible:outline-none',
          )}
        >
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li className={getCardClassName(showVisitButton)}>
      <div className={getContentClassName(showVisitButton)}>{content}</div>
      <Link
        href={href}
        aria-label={`Visit ${store.name}`}
        className="absolute inset-0 z-20 md:hidden"
      />
    </li>
  );
};

export default MedicineStoreCard;
