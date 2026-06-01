import type { ProductSearchParams } from '@/entities/product';
import SharedPagination from '@/shared/ui/Pagination';

import { getMedicinePageHref } from '../../lib';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  query: ProductSearchParams;
};

const Pagination = ({ currentPage, totalPages, query }: PaginationProps) => (
  <SharedPagination
    currentPage={currentPage}
    totalPages={totalPages}
    getPageHref={(page) => getMedicinePageHref(query, page)}
    ariaLabel="Medicine pagination"
    className="mt-space-40 md:mt-space-80"
  />
);

export default Pagination;
