import { cn } from '@/lib/utils';

import MedicineStoreCard from './MedicineStoreCard';

import type { MedicineStore } from '../model/types';

type MedicineStoresListProps = {
  stores: MedicineStore[];
  showVisitButton?: boolean;
  className?: string;
};

const MedicineStoresList = ({
  stores,
  showVisitButton = false,
  className,
}: MedicineStoresListProps) => {
  return (
    <ul
      className={cn(
        'flex flex-col items-center justify-start gap-space-20 md:flex-row md:flex-wrap md:gap-x-space-16 md:gap-y-space-32 lg:gap-x-[36px] lg:gap-y-[38px]',
        className,
      )}
    >
      {stores.map((store) => (
        <MedicineStoreCard
          key={store.id}
          store={store}
          showVisitButton={showVisitButton}
        />
      ))}
    </ul>
  );
};

export default MedicineStoresList;
