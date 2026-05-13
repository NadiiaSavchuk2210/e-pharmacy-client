import Image from 'next/image';

import PillowImage from '../../../../assets/images/auth/white-round-pill.png';

const HeroBanner = () => {
  return (
    <section
      className=" relative isolate pt-[81px] md:pt-[140px]  lg:w-[614px] lg:pt-[194px]"
      aria-labelledby="auth-hero-title"
    >
      <div
        className="pointer-events-none absolute top-[50%] right-[10%] sm:top-[11%] sm:right-[6%] z-0 size-[5.9375rem] md:right-[18%] md:top-[16%] md:size-[9.5rem] lg:top-[27%] lg:right-[6%]"
        aria-hidden="true"
      >
        <Image
          src={PillowImage}
          alt=""
          fill
          sizes="(min-width: 1280px) 179px, (min-width: 768px) 179px, 95px"
          className="object-contain"
          priority
        />
      </div>

      <h1
        id="auth-hero-title"
        className="relative z-10 text-28 font-semibold leading-34 text-text md:text-54 md:leading-60"
      >
        Your medication,
        <br />
        delivered Say goodbye
        <br />
        to all <span className="text-brand-500">your healthcare</span>
        <br />
        worries with us
      </h1>
    </section>
  );
};

export default HeroBanner;
