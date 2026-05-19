import { cn } from '@/lib/utils';

import StoreContacts from './StoreContacts';
import StoreDecor from './StoreDecor';
import StoreMeta from './StoreMeta';
import VisitStoreAction from './VisitStoreAction';

import type { MedicineStore } from '../../model/types';

type MedicineStoreCardContentProps = {
  href: string;
  store: MedicineStore;
  showVisitButton: boolean;
};

const MedicineStoreCardContent = ({
  href,
  store,
  showVisitButton,
}: MedicineStoreCardContentProps) => {
  const { name, rating, status, address, phone } = store;

  return (
    <>
      <div
        className={cn(
          'mb-space-20 flex items-start justify-between md:mb-[34px]',
          showVisitButton && 'md:mb-space-18 lg:mb-space-20',
        )}
      >
        <h3 className="text-16 font-semibold leading-space-22 text-text md:text-20 md:leading-space-28">
          {name}
        </h3>

        <StoreMeta
          rating={rating}
          status={status}
          className={showVisitButton ? 'md:hidden' : undefined}
        />
      </div>

      <StoreContacts address={address} phone={phone} />

      {showVisitButton ? <VisitStoreAction href={href} store={store} /> : null}

      <StoreDecor variant={showVisitButton ? 'visit' : 'default'} />
    </>
  );
};

export default MedicineStoreCardContent;
