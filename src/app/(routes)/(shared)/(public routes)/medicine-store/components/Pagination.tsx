import SharedPagination from '@/shared/ui/Pagination';

import { getMedicineStorePageHref } from '../medicine-store.query';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => (
  <SharedPagination
    currentPage={currentPage}
    totalPages={totalPages}
    getPageHref={getMedicineStorePageHref}
    ariaLabel="Medicine store pagination"
    className="mt-space-40 md:mt-space-80"
    clickableEllipsis={false}
  />
);

export default Pagination;
