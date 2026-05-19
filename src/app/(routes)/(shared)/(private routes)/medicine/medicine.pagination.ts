export const getPaginationItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 1) {
    return [1, 2, 'ellipsis'] as const;
  }

  if (currentPage === 2) {
    return [1, 2, 3, 'ellipsis'] as const;
  }

  if (currentPage >= totalPages - 1) {
    return ['ellipsis', totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
  ] as const;
};

export const getMobilePaginationItems = (
  currentPage: number,
  totalPages: number,
) => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage === 1) {
    return [1, 2, 'ellipsis'] as const;
  }

  if (currentPage === 2) {
    return [1, 2, 3] as const;
  }

  if (currentPage >= totalPages - 1) {
    return [totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [currentPage - 1, currentPage, currentPage + 1] as const;
};
