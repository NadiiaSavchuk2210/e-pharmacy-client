import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import {
  getMobilePaginationItems,
  getPaginationItems,
} from '../medicine-store.pagination';
import { getMedicineStorePageHref } from '../medicine-store.query';
import PaginationLink from './PaginationLink';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

type PaginationItem = number | 'ellipsis';

const pageClassName =
  'flex size-[35px] items-center justify-center rounded-full border border-border bg-bg text-14 font-bold leading-space-18 text-text transition-[background-color,border-color,color] duration-base hover:border-accent hover:bg-accent-soft hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:size-[44px] md:text-18 md:leading-space-22 lg:gap-space-10';

const activePageClassName =
  'border-brand-500 bg-brand-500 text-text-inverse hover:border-brand-500 hover:bg-brand-500 hover:text-text-inverse';

const ellipsisClassName =
  'pointer-events-none text-16 font-medium leading-space-20';

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);
  const items = getPaginationItems(currentPage, totalPages);
  const mobileItems = getMobilePaginationItems(currentPage, totalPages);
  const renderItems = (
    paginationItems: readonly PaginationItem[],
    keyPrefix: string,
    ellipsisClassNameOverride?: string,
  ) =>
    paginationItems.map((item, index) => {
      if (item === 'ellipsis') {
        return (
          <span
            key={`${keyPrefix}-ellipsis-${index}`}
            className={cn(
              pageClassName,
              ellipsisClassName,
              ellipsisClassNameOverride,
            )}
            aria-hidden="true"
          >
            <MoreHorizontal className="size-5 md:size-6" />
          </span>
        );
      }

      const isActive = item === currentPage;

      return (
        <Link
          key={`${keyPrefix}-${item}`}
          href={getMedicineStorePageHref(item)}
          aria-current={isActive ? 'page' : undefined}
          className={cn(pageClassName, isActive && activePageClassName)}
        >
          {item}
        </Link>
      );
    });

  return (
    <nav
      aria-label="Medicine store pagination"
      className="mt-space-40 flex flex-wrap items-center justify-center gap-space-4 md:mt-space-80 md:gap-space-8"
    >
      <PaginationLink
        href={getMedicineStorePageHref(1)}
        label="Go to first page"
        disabled={isFirstPage}
        className="hidden md:flex"
      >
        <ChevronsLeft className="size-5 md:size-6" aria-hidden />
      </PaginationLink>

      <PaginationLink
        href={getMedicineStorePageHref(previousPage)}
        label="Go to previous page"
        disabled={isFirstPage}
        className="mr-[13px] md:mr-[16px]"
      >
        <ChevronLeft className="size-5 md:size-6" aria-hidden />
      </PaginationLink>

      <div className="flex items-center gap-[10px] md:hidden">
        {renderItems(mobileItems, 'mobile', 'text-14 leading-space-18')}
      </div>

      <div className="hidden items-center gap-[10px] md:flex">
        {renderItems(items, 'desktop')}
      </div>

      <PaginationLink
        href={getMedicineStorePageHref(nextPage)}
        label="Go to next page"
        disabled={isLastPage}
        className="ml-[13px] md:ml-[16px]"
      >
        <ChevronRight className="size-5 md:size-6" aria-hidden />
      </PaginationLink>

      <PaginationLink
        href={getMedicineStorePageHref(totalPages)}
        label="Go to last page"
        disabled={isLastPage}
        className="hidden md:flex"
      >
        <ChevronsRight className="size-5 md:size-6" aria-hidden />
      </PaginationLink>
    </nav>
  );
};

export default Pagination;
