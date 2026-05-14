import GreenPillsLgImage from '../../../../../../../assets/images/home/green-pills-lg.png';
import GreenPillsSmImage from '../../../../../../../assets/images/home/green-pills-sm.png';

import type { CSSProperties } from 'react';

const MainBanner = () => {
  const backgroundImageVars = {
    '--main-banner-pills-sm': `url(${GreenPillsSmImage.src})`,
    '--main-banner-pills-lg': `url(${GreenPillsLgImage.src})`,
  } as CSSProperties;

  return (
    <section className="bg-brand-500">
      <div
        className="container bg-no-repeat pt-[172px] pb-[337px]  [background-image:var(--main-banner-pills-sm)] [background-position:35%_9.5rem] [background-size:331px_312px] md:pt-[158px] md:pb-[414px] md:[background-image:var(--main-banner-pills-lg)] md:[background-position:15px_15px] md:[background-size:749px_508px] lg:min-h-[508px] lg:max-w-[749px] lg:pt-[180px] lg:pb-[302px] lg:[background-position:62%_37px] lg:[background-size:749px]"
        style={backgroundImageVars}
      >
        <h1 className="mb-5 max-w-[291px] font-semibold text-50 leading-50 text-text-inverse text-shadow-hero md:mb-6 md:max-w-[620px] md:text-74 md:leading-74 lg:ml-[54px] lg:max-w-[609px]">
          Your medication delivered
        </h1>
        <p className="ml-auto max-w-[156px] font-normal text-12 leading-16 text-text-inverse md:max-w-[207px] md:text-16 md:leading-20 lg:mr-[105px]">
          Say goodbye to all your healthcare worries with us
        </p>
      </div>
    </section>
  );
};

export default MainBanner;
