import SharedPagination from '@/shared/ui/Pagination';

import { getOrdersPageHref } from '../lib';

type OrdersPaginationProps = {
  currentPage: number;
  totalPages: number;
};

const OrdersPagination = ({
  currentPage,
  totalPages,
}: OrdersPaginationProps) => (
  <SharedPagination
    currentPage={currentPage}
    totalPages={totalPages}
    getPageHref={getOrdersPageHref}
    ariaLabel="Orders pagination"
    className="mt-space-40 md:mt-space-60"
  />
);

export default OrdersPagination;
