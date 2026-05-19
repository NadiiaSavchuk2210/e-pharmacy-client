import { cn } from '@/lib/utils';
import { Icon } from '@/shared/ui/Icon';

interface StoreDecorProps {
  className?: string;
  variant?: 'default' | 'visit';
}

const decorVariantClassName = {
  default: '',
  visit: 'md:top-[-125px] md:bottom-0 md:right-[-25px] md:h-full md:w-[168px]',
};

const StoreDecor = ({ className, variant = 'default' }: StoreDecorProps) => (
  <Icon
    name="lines"
    className={cn(
      'absolute bottom-[-16px] right-[-16px] h-[168px] w-[168px] text-brand-50 transition-colors duration-[650ms] group-hover:text-accent-soft group-focus-within:text-accent-soft md:bottom-[-5px] md:right-[-90px] md:w-[257px]',
      decorVariantClassName[variant],
      className,
    )}
  />
);

export default StoreDecor;
