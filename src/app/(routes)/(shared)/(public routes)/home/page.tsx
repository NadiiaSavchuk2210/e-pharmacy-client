import MainBanner from './components/MainBanner';
import PromoBanners from './components/PromoBanners';

const HomePage = async () => {
  return (
    <>
      <MainBanner />

      <PromoBanners />
    </>
  );
};

export { metadata } from './metadata';

export default HomePage;
