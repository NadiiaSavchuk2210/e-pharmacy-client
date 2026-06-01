import { ApiFetchError, fetchApiData } from '@/shared/api/apiFetch';
import { cacheTags } from '@/shared/cache/cacheTags';

import {
  findFallbackApiStoreById,
  fetchStores,
  fetchStoresPage,
} from './storesApi.helpers';
import { normalizeMedicineStore } from '../lib/storeMappers';

import type {
  ApiMedicineStore,
  MedicineStoreSearchParams,
} from '../model/types';

export const getRandomNearestMedicineStores = (limit = 6) =>
  fetchStores('/stores/random-nearest', { limit });

export const getNearestMedicineStores = (limit = 10) =>
  fetchStores('/stores/nearest', { limit });

export const getRandomMedicineStores = (limit = 6) =>
  fetchStores('/stores', { limit, random: true });

export const getMedicineStores = (limit = 9) =>
  fetchStores('/stores', { limit });

export const getMedicineStoresPage = ({
  limit = 9,
  page,
}: MedicineStoreSearchParams = {}) =>
  fetchStoresPage('/stores', { limit, page });

export const getMedicineStoreById = async (id: string) => {
  const encodedId = encodeURIComponent(id);

  try {
    const store = await fetchApiData<ApiMedicineStore>({
      path: `/stores/${encodedId}`,
      tags: [cacheTags.medicineStores, cacheTags.medicineStore(id)],
      errorMessage: 'Failed to fetch store',
    });

    return normalizeMedicineStore(store);
  } catch (error) {
    if (!(error instanceof ApiFetchError) || error.status !== 404) {
      throw error;
    }
  }

  const fallbackStore = await findFallbackApiStoreById(id);

  if (!fallbackStore) {
    return null;
  }

  return normalizeMedicineStore(fallbackStore);
};
