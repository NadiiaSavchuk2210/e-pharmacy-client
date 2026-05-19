import { fetchApiData } from '@/shared/api/apiFetch';

import { normalizeMedicineStore } from '../lib/storeMappers';

import type { ApiMedicineStore } from '../model/types';

export type ApiMedicineStoresPage = {
  items: ApiMedicineStore[];
  meta: {
    totalItems: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  };
};

export const fetchApiStores = async (
  path: string,
  limit: number,
  params: Record<string, string> = {},
) => {
  const stores = await fetchApiData<ApiMedicineStore[] | ApiMedicineStoresPage>(
    {
      path,
      params: {
        ...params,
        limit,
      },
      errorMessage: 'Failed to fetch stores',
    },
  );

  return Array.isArray(stores) ? stores : stores.items;
};

export const fetchStores = async (
  path: string,
  limit: number,
  params: Record<string, string> = {},
) => {
  const stores = await fetchApiStores(path, limit, params);

  return stores.map(normalizeMedicineStore);
};
