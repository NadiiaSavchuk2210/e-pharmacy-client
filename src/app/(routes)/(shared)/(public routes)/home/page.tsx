import { Reviews } from '@/widgets/reviews';

import MainBanner from './components/MainBanner';
import MedicineStores from './components/MedicineStores';
import Promo from './components/Promo';
import PromoBanners from './components/PromoBanners';

const HomePage = async () => {
  return (
    <>
      <MainBanner />

      <PromoBanners />
      <MedicineStores />
      <Promo />
      <Reviews />
    </>
  );
};

export { metadata } from './metadata';

export default HomePage;
