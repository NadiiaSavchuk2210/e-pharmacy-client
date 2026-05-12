import { cn } from '@/lib/utils';

interface FooterTextProps {
  className?: string;
}

const FooterText = ({ className }: FooterTextProps) => {
  return (
    <p
      className={cn(
        'font-normal text-14 leading-18 text-neutral-50 md:text-16 md:leading-20 lg:max-w-[311px]',
        className,
      )}
    >
      Get the medicine to help you feel better, get back to your active life,
      and enjoy every moment.
    </p>
  );
};

export default FooterText;
