import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react';
import Link from 'next/link';

import type { ProductSearchParams } from '@/entities/product';
import { cn } from '@/lib/utils';

import {
  getMobilePaginationItems,
  getPaginationItems,
} from '../medicine.pagination';
import { getMedicinePageHref } from '../medicine.query';
import PaginationLink from './PaginationLink';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  query: ProductSearchParams;
};

const pageClassName =
  'flex size-[35px] items-center justify-center rounded-full border border-border bg-bg text-14 font-bold leading-space-18 text-text transition-[background-color,border-color,color] duration-base hover:border-accent hover:bg-accent-soft hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:size-[44px] md:text-18 md:leading-space-22 lg:gap-space-10';

const activePageClassName =
  'border-brand-500 bg-brand-500 text-text-inverse hover:border-brand-500 hover:bg-brand-500 hover:text-text-inverse';

const getEllipsisTargetPage = (
  previousItem: number | 'ellipsis' | undefined,
  nextItem: number | 'ellipsis' | undefined,
) => {
  if (typeof previousItem === 'number') {
    return previousItem + 1;
  }

  if (typeof nextItem === 'number') {
    return nextItem - 1;
  }

  return null;
};

const Pagination = ({ currentPage, totalPages, query }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);
  const items = getPaginationItems(currentPage, totalPages);
  const mobileItems = getMobilePaginationItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Medicine pagination"
      className="mt-space-40 flex flex-wrap items-center justify-center gap-space-4 md:mt-space-80 md:gap-space-8"
    >
      <PaginationLink
        href={getMedicinePageHref(query, 1)}
        label="Go to first page"
        disabled={isFirstPage}
        className="hidden md:flex"
      >
        <ChevronsLeft className="size-5 md:size-6" aria-hidden />
      </PaginationLink>

      <PaginationLink
        href={getMedicinePageHref(query, previousPage)}
        label="Go to previous page"
        disabled={isFirstPage}
        className="mr-[13px] md:mr-[16px]"
      >
        <ChevronLeft className="size-5 md:size-6" aria-hidden />
      </PaginationLink>

      <div className="flex items-center gap-[10px] md:hidden">
        {mobileItems.map((item, index) => {
          if (item === 'ellipsis') {
            const previousItem = mobileItems[index - 1];
            const nextItem = mobileItems[index + 1];
            const targetPage = getEllipsisTargetPage(previousItem, nextItem);

            if (targetPage && targetPage >= 1 && targetPage <= totalPages) {
              return (
                <Link
                  key={`mobile-ellipsis-${index}`}
                  href={getMedicinePageHref(query, targetPage)}
                  aria-label={`Go to page ${targetPage}`}
                  className={cn(
                    pageClassName,
                    'font-medium md:text-20 md:leading-space-22',
                  )}
                >
                  <MoreHorizontal className="size-5 md:size-6" aria-hidden />
                </Link>
              );
            }

            return (
              <span
                key={`mobile-ellipsis-${index}`}
                className={cn(
                  pageClassName,
                  'pointer-events-none',
                  'font-medium',
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
              key={`mobile-${item}`}
              href={getMedicinePageHref(query, item)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(pageClassName, isActive && activePageClassName)}
            >
              {item}
            </Link>
          );
        })}
      </div>

      <div className="hidden items-center gap-[10px] md:flex">
        {items.map((item, index) => {
          if (item === 'ellipsis') {
            const previousItem = items[index - 1];
            const nextItem = items[index + 1];
            const targetPage = getEllipsisTargetPage(previousItem, nextItem);

            if (targetPage && targetPage >= 1 && targetPage <= totalPages) {
              return (
                <Link
                  key={`ellipsis-${index}`}
                  href={getMedicinePageHref(query, targetPage)}
                  aria-label={`Go to page ${targetPage}`}
                  className={cn(
                    pageClassName,
                    'font-medium text-16 leading-space-20 pt-space-14',
                  )}
                >
                  <MoreHorizontal className="size-5 md:size-6" aria-hidden />
                </Link>
              );
            }

            return (
              <span
                key={`ellipsis-${index}`}
                className={cn(
                  pageClassName,
                  'pointer-events-none',
                  'font-medium text-16 leading-space-20 pt-space-14',
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
              key={item}
              href={getMedicinePageHref(query, item)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(pageClassName, isActive && activePageClassName)}
            >
              {item}
            </Link>
          );
        })}
      </div>

      <PaginationLink
        href={getMedicinePageHref(query, nextPage)}
        label="Go to next page"
        disabled={isLastPage}
        className="ml-[13px] md:ml-[16px]"
      >
        <ChevronRight className="size-5 md:size-6" aria-hidden />
      </PaginationLink>

      <PaginationLink
        href={getMedicinePageHref(query, totalPages)}
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
