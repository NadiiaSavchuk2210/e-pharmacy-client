import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import type { MedicineStore } from '@/entities/medicine-store';
import { Icon } from '@/shared/ui/Icon';

const storeItemClassName =
  'group relative h-[202px] w-full max-w-[335px] overflow-hidden rounded-[27px] border-[1.15px] border-card-border bg-card-bg shadow-sm transition-[scale,background-color,border-color,box-shadow] duration-[650ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.02] hover:border-accent hover:bg-accent-soft hover:shadow-md focus-within:scale-[1.02] focus-within:border-accent focus-within:bg-accent-soft focus-within:shadow-md md:h-[232px] md:max-w-none md:w-[calc((100%_-_var(--space-16))_/_2)] lg:w-[calc((100%_-_72px)_/_3)]';

type StoresListProps = {
  stores: MedicineStore[];
};

const StoresList = ({ stores }: StoresListProps) => {
  return (
    <ul className="flex flex-col items-center justify-start gap-space-20 md:flex-row md:flex-wrap md:gap-x-space-16 md:gap-y-space-32 lg:gap-x-[36px] lg:gap-y-[38px]">
      {stores.map(
        ({ id, name, rating, address, phone, status }) => (
          <li key={id} className={storeItemClassName}>
            <Link
              href={`/medicine-store/${id}`}
              className="block h-full cursor-pointer p-space-40 focus-visible:outline-none"
            >
              <div className="mb-space-20 flex items-start justify-between md:mb-[34px]">
                <h3 className="text-16 font-semibold leading-space-22 text-text md:text-20 md:leading-space-28">
                  {name}
                </h3>
                <div className="flex items-center gap-space-14">
                  <div className="flex gap-1.5">
                    <Icon name="star" className="size-4 text-warning" />
                    <span className="text-14 font-medium leading-space-18 text-text">
                      {rating}
                    </span>
                  </div>
                  <Badge variant={status}>{status.toUpperCase()}</Badge>
                </div>
              </div>

              <address className="relative z-10 not-italic">
                <dl className="flex flex-col gap-space-18 text-text-subtle">
                  <div className="flex items-start gap-space-14">
                    <dt className="sr-only">Address</dt>
                    <dd className="flex items-start gap-space-8">
                      <Icon
                        name="map-pin"
                        className="size-[18px] stroke-brand-500"
                      />
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
                      <Icon
                        name="phone"
                        className="size-[18px] stroke-brand-500"
                      />
                      <span className="text-14 font-normal leading-space-18 md:text-16 md:leading-space-20">
                        {phone}
                      </span>
                    </dd>
                  </div>
                </dl>
              </address>

              <Icon
                name="lines"
                className="absolute bottom-[-16px] right-[-16px] h-[168px] w-[168px] text-brand-50 transition-colors duration-[650ms] group-hover:text-accent-soft group-focus-within:text-accent-soft md:bottom-[-5px] md:right-[-90px] md:w-[257px]"
              />
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

export default StoresList;
