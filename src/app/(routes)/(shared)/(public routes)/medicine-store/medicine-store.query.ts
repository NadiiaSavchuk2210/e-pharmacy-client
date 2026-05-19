export type MedicineStoreSearchParamsRecord = Record<
  string,
  string | string[] | undefined
>;

export type MedicineStoreRouteSearchParams =
  Promise<MedicineStoreSearchParamsRecord>;

const getSearchParam = (
  searchParams: MedicineStoreSearchParamsRecord,
  key: string,
) => {
  const value = searchParams[key];

  return Array.isArray(value) ? value[0] : value;
};

export const getCurrentPage = (
  searchParams: MedicineStoreSearchParamsRecord,
) => {
  const page = getSearchParam(searchParams, 'page');
  const parsedPage = Number.parseInt(page ?? '', 10);

  return Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
};

export const getMedicineStorePageHref = (page: number) =>
  page > 1 ? `/medicine-store?page=${page}` : '/medicine-store';
