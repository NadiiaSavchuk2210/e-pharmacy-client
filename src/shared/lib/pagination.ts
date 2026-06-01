export type PaginationItem = number | 'ellipsis';

export const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): PaginationItem[] => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 1) {
    return [1, 2, 'ellipsis'];
  }

  if (currentPage === 2) {
    return [1, 2, 3, 'ellipsis'];
  }

  if (currentPage >= totalPages - 1) {
    return ['ellipsis', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
  ];
};

export const getMobilePaginationItems = (
  currentPage: number,
  totalPages: number,
): PaginationItem[] => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage === 1) {
    return [1, 2, 'ellipsis'];
  }

  if (currentPage === 2) {
    return [1, 2, 3];
  }

  if (currentPage >= totalPages - 1) {
    return [totalPages - 2, totalPages - 1, totalPages];
  }

  return [currentPage - 1, currentPage, currentPage + 1];
};

export const getEllipsisTargetPage = (
  previousItem: PaginationItem | undefined,
  nextItem: PaginationItem | undefined,
) => {
  if (typeof previousItem === 'number') {
    return previousItem + 1;
  }

  if (typeof nextItem === 'number') {
    return nextItem - 1;
  }

  return null;
};
