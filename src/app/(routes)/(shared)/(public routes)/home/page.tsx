import MainBanner from './components/MainBanner';
import MedicineStores from './components/MedicineStores';
import PromoBanners from './components/PromoBanners';

const HomePage = async () => {
  return (
    <>
      <MainBanner />

      <PromoBanners />
      <MedicineStores />
    </>
  );
};

export { metadata } from './metadata';

export default HomePage;
