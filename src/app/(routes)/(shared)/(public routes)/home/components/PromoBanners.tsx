import Link from 'next/link';

const promoBanners = [
  {
    id: 1,
    title: 'Huge Sale',
    value: '70%',
    linkText: 'Shop now',
    href: '/medicine?discount=70',
  },
  {
    id: 2,
    title: 'Secure delivery',
    value: '100%',
    linkText: 'Read more',
    href: '/feature',
  },
  {
    id: 3,
    title: 'Off',
    value: '35%',
    linkText: 'Shop now',
    href: '/medicine?discount=35',
  },
];

const bannerItemClassName =
  'flex w-full flex-col gap-space-14 rounded-[27px] border-[1.15px] border-border bg-bg-subtle px-space-18 py-space-14 shadow-sm transition-[background-color,border-color,box-shadow] duration-[650ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-accent hover:bg-accent-soft hover:shadow-md md:w-[calc((100%_-_var(--space-28))_/_2)] lg:w-[calc((100%_-_(var(--space-28)_+_var(--space-28)))_/_3)]';

const bannerTitleClassName =
  'flex max-w-[186px] items-center gap-space-14 text-16 font-medium leading-22 text-text-muted md:text-20 md:leading-28';

const bannerNumberClassName =
  'flex size-[54px] shrink-0 items-center justify-center rounded-full bg-promo-banner-number-bg text-center text-24 font-normal leading-150 text-promo-banner-number-text transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:size-[74px] md:text-28 md:leading-28';

const bannerTextClassName = 'flex items-baseline gap-[34px] md:gap-space-28';

const bannerValueClassName =
  'text-24 font-medium leading-34 text-text-muted md:text-36 md:leading-50';

const bannerLinkClassName =
  'text-13 font-normal leading-18 text-promo-banner-link transition-[color,text-decoration-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-promo-banner-link-hover hover:underline hover:decoration-promo-banner-link-hover hover:underline-offset-4 focus-visible:text-promo-banner-link-hover focus-visible:outline-none';

const PromoBanners = () => {
  return (
    <section className="bg-surface-muted py-space-40 md:py-space-60">
      <h2 className="visually-hidden">Promo Banners</h2>

      <ul className="container | flex flex-col gap-space-16 md:flex-row md:gap-space-28 md:flex-wrap md:max-w-[670px] lg:max-w-[1019px] lg:flex-nowrap">
        {promoBanners.map(({ id, title, value, linkText, href }) => (
          <li key={id} className={bannerItemClassName}>
            <h3 className={bannerTitleClassName}>
              <span className={bannerNumberClassName}>{id}</span>
              {title}
            </h3>
            <p className={bannerTextClassName}>
              <span className={bannerValueClassName}>{value}</span>

              <Link href={href} className={bannerLinkClassName}>
                {linkText}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PromoBanners;
