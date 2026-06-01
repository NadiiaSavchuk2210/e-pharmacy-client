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
  getEllipsisTargetPage,
  getMobilePaginationItems,
  getPaginationItems,
  type PaginationItem,
} from '@/shared/lib/pagination';

import PaginationLink from './PaginationLink';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
  ariaLabel: string;
  className?: string;
  labelPrefix?: string;
  clickableEllipsis?: boolean;
};

const pageClassName =
  'flex size-[35px] items-center justify-center rounded-full border border-border bg-bg text-14 font-bold leading-space-18 text-text transition-[background-color,border-color,color] duration-base hover:border-accent hover:bg-accent-soft hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:size-[44px] md:text-18 md:leading-space-22 lg:gap-space-10';

const activePageClassName =
  'border-brand-500 bg-brand-500 text-text-inverse hover:border-brand-500 hover:bg-brand-500 hover:text-text-inverse';

const desktopEllipsisClassName = 'font-medium text-16 leading-space-20 pt-space-14';
const mobileEllipsisClassName = 'font-medium text-14 leading-space-18';

const getControlLabel = (action: string, labelPrefix?: string) =>
  labelPrefix ? `Go to ${action} ${labelPrefix} page` : `Go to ${action} page`;

const Pagination = ({
  currentPage,
  totalPages,
  getPageHref,
  ariaLabel,
  className,
  labelPrefix,
  clickableEllipsis = true,
}: PaginationProps) => {
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
    ellipsisClassName: string,
  ) =>
    paginationItems.map((item, index) => {
      if (item === 'ellipsis') {
        const targetPage = getEllipsisTargetPage(
          paginationItems[index - 1],
          paginationItems[index + 1],
        );

        if (
          clickableEllipsis &&
          targetPage &&
          targetPage >= 1 &&
          targetPage <= totalPages
        ) {
          return (
            <Link
              key={`${keyPrefix}-ellipsis-${index}`}
              href={getPageHref(targetPage)}
              aria-label={`Go to page ${targetPage}`}
              className={cn(pageClassName, ellipsisClassName)}
            >
              <MoreHorizontal className="size-5 md:size-6" aria-hidden />
            </Link>
          );
        }

        return (
          <span
            key={`${keyPrefix}-ellipsis-${index}`}
            className={cn(pageClassName, 'pointer-events-none', ellipsisClassName)}
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
          href={getPageHref(item)}
          aria-current={isActive ? 'page' : undefined}
          className={cn(pageClassName, isActive && activePageClassName)}
        >
          {item}
        </Link>
      );
    });

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'flex flex-wrap items-center justify-center gap-space-4 md:gap-space-8',
        className,
      )}
    >
      <PaginationLink
        href={getPageHref(1)}
        label={getControlLabel('first', labelPrefix)}
        disabled={isFirstPage}
        className="hidden md:flex"
      >
        <ChevronsLeft className="size-5 md:size-6" aria-hidden />
      </PaginationLink>

      <PaginationLink
        href={getPageHref(previousPage)}
        label={getControlLabel('previous', labelPrefix)}
        disabled={isFirstPage}
        className="mr-[13px] md:mr-[16px]"
      >
        <ChevronLeft className="size-5 md:size-6" aria-hidden />
      </PaginationLink>

      <div className="flex items-center gap-[10px] md:hidden">
        {renderItems(mobileItems, 'mobile', mobileEllipsisClassName)}
      </div>

      <div className="hidden items-center gap-[10px] md:flex">
        {renderItems(items, 'desktop', desktopEllipsisClassName)}
      </div>

      <PaginationLink
        href={getPageHref(nextPage)}
        label={getControlLabel('next', labelPrefix)}
        disabled={isLastPage}
        className="ml-[13px] md:ml-[16px]"
      >
        <ChevronRight className="size-5 md:size-6" aria-hidden />
      </PaginationLink>

      <PaginationLink
        href={getPageHref(totalPages)}
        label={getControlLabel('last', labelPrefix)}
        disabled={isLastPage}
        className="hidden md:flex"
      >
        <ChevronsRight className="size-5 md:size-6" aria-hidden />
      </PaginationLink>
    </nav>
  );
};

export default Pagination;
