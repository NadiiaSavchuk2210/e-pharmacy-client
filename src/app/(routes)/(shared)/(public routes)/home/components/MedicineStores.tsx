import {
  getRandomNearestMedicineStores,
  MedicineStoresList,
} from '@/entities/medicine-store';
import SectionHeader from '@/shared/ui/SectionHeader';

const MedicineStores = async () => {
  const stores = await getRandomNearestMedicineStores(6);

  return (
    <section className="container | py-space-40 md:py-space-60 lg:[--container-max:1248px]">
      <SectionHeader
        title="Your Nearest Medicine Store"
        description="Search for Medicine, Filter by your location"
        titleClassName="max-w-[291px] self-center md:max-w-full"
      />
      <MedicineStoresList stores={stores} />
    </section>
  );
};

export default MedicineStores;
