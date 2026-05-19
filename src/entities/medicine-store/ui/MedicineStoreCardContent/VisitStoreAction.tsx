import Link from 'next/link';

import StoreMeta from './StoreMeta';

import type { MedicineStore } from '../../model/types';

type VisitStoreActionProps = {
  href: string;
  store: MedicineStore;
};

const VisitStoreAction = ({ href, store }: VisitStoreActionProps) => (
  <div className="relative z-20 mt-space-36 hidden items-center justify-between md:flex">
    <Link
      href={href}
      className="inline-flex h-[34px] min-w-[102px] items-center justify-center rounded-full bg-brand-500 py-space-10 px-space-16 text-14 font-medium leading-space-14 text-text-inverse transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      Visit Store
    </Link>

    <StoreMeta
      rating={store.rating}
      status={store.status}
      className="gap-space-14"
    />
  </div>
);

export default VisitStoreAction;
