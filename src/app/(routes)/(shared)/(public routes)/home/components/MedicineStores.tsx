import { getRandomNearestMedicineStores } from '@/entities/medicine-store';

import StoresList from './StoresList';

const MedicineStores = async () => {
  const stores = await getRandomNearestMedicineStores(6);

  return (
    <section className="container | py-space-40 md:py-space-60 lg:[--container-max:1248px]">
      <div className="mb-space-40 flex flex-col gap-space-14 text-center md:mb-space-64">
        <h2 className="font-semibold text-28 leading-space-32 text-text md:text-40 md:leading-space-48">
          Your Nearest Medicine Store
        </h2>
        <p className="font-normal text-14 leading-space-18 text-text-muted md:text-16 md:leading-space-20">
          Search for Medicine, Filter by your location
        </p>
      </div>
      <StoresList stores={stores} />
    </section>
  );
};

export default MedicineStores;
