import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { getMedicineStoreById } from '@/entities/medicine-store';
import { Icon } from '@/shared/ui/Icon';

interface Props {
  params: Promise<{
    storeId: string;
  }>;
}

const MedicineStoreDetailsPage = async ({ params }: Props) => {
  const { storeId } = await params;
  const store = await getMedicineStoreById(storeId);

  if (!store) {
    notFound();
  }

  return (
    <section className="container | py-space-40 md:py-space-60 lg:[--container-max:1184px]">
      <Link
        href="/medicine-store"
        className="mb-space-32 inline-flex text-14 font-medium leading-space-18 text-brand-700 transition-colors hover:text-brand-500"
      >
        Back to all stores
      </Link>

      <div className="overflow-hidden rounded-[27px] border border-card-border bg-card-bg p-space-24 shadow-sm md:p-space-40">
        <div className="mb-space-32 flex flex-col gap-space-20 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="mb-space-14 text-28 font-semibold leading-space-32 text-text md:text-40 md:leading-space-48">
              {store.name}
            </h1>
            <p className="text-14 font-normal leading-space-18 text-text-muted md:text-16 md:leading-space-20">
              Detailed information about the selected medicine store.
            </p>
          </div>

          <div className="flex items-center gap-space-14">
            <div className="flex gap-1.5">
              <Icon name="star" className="size-4 text-warning" />
              <span className="text-14 font-medium leading-space-18 text-text">
                {store.rating}
              </span>
            </div>
            <Badge variant={store.status}>{store.status.toUpperCase()}</Badge>
          </div>
        </div>

        <dl className="grid gap-space-20 text-text-subtle md:grid-cols-2">
          <div className="flex items-start gap-space-8">
            <Icon name="map-pin" className="size-[18px] stroke-brand-500" />
            <div>
              <dt className="mb-space-4 text-12 font-semibold uppercase leading-space-16 text-text-weak">
                Address
              </dt>
              <dd className="text-16 leading-space-20 text-text">
                {store.address.join(', ')}
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-space-8">
            <Icon name="phone" className="size-[18px] stroke-brand-500" />
            <div>
              <dt className="mb-space-4 text-12 font-semibold uppercase leading-space-16 text-text-weak">
                Phone
              </dt>
              <dd>
                <Link
                  href={store.phoneHref}
                  className="text-16 leading-space-20 text-text transition-colors hover:text-brand-700"
                >
                  {store.phone}
                </Link>
              </dd>
            </div>
          </div>

          <div className="pl-[calc(18px+var(--space-8))]">
            <dt className="mb-space-4 text-12 font-semibold uppercase leading-space-16 text-text-weak">
              Working hours
            </dt>
            <dd className="text-16 leading-space-20 text-text">
              {store.workingHours}
            </dd>
          </div>

          <div className="pl-[calc(18px+var(--space-8))]">
            <dt className="mb-space-4 text-12 font-semibold uppercase leading-space-16 text-text-weak">
              Store manager
            </dt>
            <dd className="text-16 leading-space-20 text-text">
              {store.manager}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default MedicineStoreDetailsPage;
