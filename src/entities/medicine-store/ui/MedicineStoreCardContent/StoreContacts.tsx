import { Icon } from '@/shared/ui/Icon';

import type { MedicineStore } from '../../model/types';

type StoreContactsProps = Pick<MedicineStore, 'address' | 'phone'>;

const StoreContacts = ({ address, phone }: StoreContactsProps) => (
  <address className="relative z-10 not-italic">
    <dl className="flex flex-col gap-space-18 text-text-subtle md:gap-space-14">
      <div className="flex items-start gap-space-14">
        <dt className="sr-only">Address</dt>
        <dd className="flex items-start gap-space-8">
          <Icon name="map-pin" className="size-[18px] stroke-brand-500" />
          <span className="text-14 font-normal leading-space-18 md:text-16 md:leading-space-20">
            {address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </dd>
      </div>

      <div className="flex items-start gap-space-14">
        <dt className="sr-only">Phone</dt>
        <dd className="flex items-start gap-space-8">
          <Icon name="phone" className="size-[18px] stroke-brand-500" />
          <span className="text-14 font-normal leading-space-18 md:text-16 md:leading-space-20">
            {phone}
          </span>
        </dd>
      </div>
    </dl>
  </address>
);

export default StoreContacts;
