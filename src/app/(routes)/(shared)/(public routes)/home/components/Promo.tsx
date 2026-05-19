import { Zap } from 'lucide-react';
import Image, { getImageProps } from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import PromoImgLg from '../../../../../../../assets/images/home/client-promo-lg.png';
import PromoImgSm from '../../../../../../../assets/images/home/client-promo-sm.png';

const features = [
  'Take user orders form online',
  'Create your shop profile',
  'Manage your store',
  'Get more orders',
  'Storage shed',
];

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
    <section className="container | overflow-hidden pt-10 md:pt-space-60 lg:[--container-max:1248px]">
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
          <source media="(min-width: 768px)" srcSet={promoImgLgSrcSet} />
          <Image
            src={PromoImgSm}
            width={294}
            height={335}
            alt="Promo"
            sizes={commonPromoImageProps.sizes}
            className="block w-[18.375rem] md:h-space-406 md:w-[38rem]"
          />
        </picture>
      </div>
      <div className="pt-space-48 pb-space-44 md:pt-[72px] md:pb-space-64">
        <div className="motion-safe:[animation:features-marquee_var(--promo-features-marquee-duration)_linear_infinite] flex w-max [--promo-features-gap:var(--space-48)] [--promo-features-gap-shift:var(--space-24)] gap-[var(--promo-features-gap)] md:[--promo-features-gap:var(--space-32)] md:[--promo-features-gap-shift:var(--space-16)] lg:w-full lg:animate-none lg:justify-between lg:[--promo-features-gap:var(--space-24)] lg:[--promo-features-gap-shift:var(--space-12)]">
          {[...features, ...features].map((feature, index) => (
            <div
              key={`${feature}-${index}`}
              aria-hidden={index >= features.length}
              className={`${index >= features.length ? 'lg:hidden' : ''} flex shrink-0 items-center gap-space-8 font-semibold text-14 leading-space-18 tracking-[-0.02em] text-text md:text-16 md:leading-space-20 lg:shrink lg:whitespace-nowrap`}
            >
              <Zap
                aria-hidden="true"
                className="size-space-20 shrink-0 stroke-accent"
                strokeWidth={1.8}
              />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promo;
