import { fetchApiData } from '@/shared/api/apiFetch';

import { findStoreInList, normalizeMedicineStore } from '../lib/storeMappers';

import type {
  ApiMedicineStore,
  ApiMedicineStorePage,
  MedicineStorePage,
  MedicineStoreSearchParams,
} from '../model/types';

type ApiStoresResponse = ApiMedicineStore[] | ApiMedicineStorePage;

const fetchApiStoresResponse = (
  path: string,
  params: MedicineStoreSearchParams = {},
) =>
  fetchApiData<ApiStoresResponse>({
    path,
    params: { ...params },
    errorMessage: 'Failed to fetch stores',
  });

export const fetchApiStores = async (
  path: string,
  params: MedicineStoreSearchParams = {},
) => {
  const stores = await fetchApiStoresResponse(path, params);

  return Array.isArray(stores) ? stores : stores.items;
};

export const fetchStoresPage = async (
  path: string,
  params: MedicineStoreSearchParams = {},
): Promise<MedicineStorePage> => {
  const stores = await fetchApiStoresResponse(path, {
    limit: 9,
    ...params,
  });

  if (Array.isArray(stores)) {
    const items = stores.map(normalizeMedicineStore);

    return {
      items,
      meta: {
        totalItems: items.length,
        currentPage: 1,
        perPage: items.length,
        totalPages: 1,
      },
    };
  }

  return {
    ...stores,
    items: stores.items.map(normalizeMedicineStore),
  };
};

export const findFallbackApiStoreById = async (id: string) => {
  const [nearestStores, stores] = await Promise.all([
    fetchApiStores('/stores/nearest', { limit: 100 }),
    fetchApiStores('/stores', { limit: 100 }),
  ]);

  return findStoreInList(nearestStores, id) ?? findStoreInList(stores, id);
};

export const fetchStores = async (
  path: string,
  params: MedicineStoreSearchParams = {},
) => {
  const stores = await fetchApiStores(path, params);

  return stores.map(normalizeMedicineStore);
};
