import Image, { getImageProps } from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import PromoImgLg from '../../../../../../../assets/images/home/client-promo-lg.png';
import PromoImgSm from '../../../../../../../assets/images/home/client-promo-sm.png';

const Promo = () => {
  const commonPromoImageProps = {
    alt: 'Promo',
    sizes: '(min-width: 1440px) 608px, 294px',
  };

  const {
    props: { srcSet: promoImgLgSrcSet },
  } = getImageProps({
    ...commonPromoImageProps,
    src: PromoImgLg,
    width: 608,
    height: 406,
  });

  return (
    <section className="container | pt-10 pb-5 md:pt-space-60 md:pb-8 lg:[--container-max:1248px]">
      <div className="rounded-[var(--space-32)] bg-accent px-5 pt-10 pb-5 text-text-inverse dark:bg-brand-700 md:pt-space-104 md:pb-space-40 md:pl-space-48 lg:flex lg:flex-row lg:gap-[19px] lg:py-space-40 lg:pr-space-40 lg:pl-space-80">
        <div className="mb-space-39 md:mb-space-83 md:max-w-[604px] lg:pt-space-64 lg:mb-0 lg:max-w-[501px]">
          <h2 className="mb-5 font-semibold text-28 leading-space-32 tracking-[-0.01em] md:mb-space-24 md:text-48 md:leading-space-55">
            Add the medicines you need online now
          </h2>
          <p className="mb-10 font-normal text-14 leading-space-18 md:text-16 md:leading-space-20">
            Enjoy the convenience of having your prescriptions filled from home
            by connecting with your community pharmacy through our online
            platform.
          </p>
          <Button
            asChild
            className="min-h-space-44 min-w-space-154 md:min-w-space-190"
            variant={'outlineInverse'}
          >
            <Link href="/medicine-store">Buy medicine</Link>
          </Button>
        </div>
        <picture>
          <source media="(min-width: 1440px)" srcSet={promoImgLgSrcSet} />
          <Image
            src={PromoImgSm}
            width={294}
            height={335}
            alt="Promo"
            sizes={commonPromoImageProps.sizes}
            className="block w-[18.375rem] lg:h-space-406 lg:w-[38rem]"
          />
        </picture>
      </div>
    </section>
  );
};

export default Promo;
