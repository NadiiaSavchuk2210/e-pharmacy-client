import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Icon } from '@/shared/ui/Icon';

import type { MedicineStore } from '../../model/types';

type StoreMetaProps = Pick<MedicineStore, 'rating' | 'status'> & {
  className?: string;
};

const StoreMeta = ({ rating, status, className }: StoreMetaProps) => (
  <div className={cn('flex items-center gap-space-14', className)}>
    <div className="flex gap-1.5">
      <Icon name="star" className="size-4 text-warning" />
      <span className="text-14 font-medium leading-space-18 text-text">
        {rating}
      </span>
    </div>

    <Badge variant={status}>{status.toUpperCase()}</Badge>
  </div>
);

export default StoreMeta;
