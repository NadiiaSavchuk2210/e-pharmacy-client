import { ApiFetchError, fetchApiData } from '@/shared/api/apiFetch';

import { fetchApiStores, fetchStores } from './storesApi.helpers';
import { findStoreInList, normalizeMedicineStore } from '../lib/storeMappers';

import type { ApiMedicineStore } from '../model/types';

export const getRandomNearestMedicineStores = (limit = 6) =>
  fetchStores('/stores/random-nearest', limit);

export const getNearestMedicineStores = (limit = 10) =>
  fetchStores('/stores/nearest', limit);

export const getMedicineStores = (limit = 100) => fetchStores('/stores', limit);

export const getMedicineStoreById = async (id: string) => {
  const encodedId = encodeURIComponent(id);

  try {
    const store = await fetchApiData<ApiMedicineStore>({
      path: `/stores/${encodedId}`,
      errorMessage: 'Failed to fetch store',
    });

    return normalizeMedicineStore(store, 0);
  } catch (error) {
    if (!(error instanceof ApiFetchError) || error.status !== 404) {
      throw error;
    }
  }

  const fallbackStore =
    findStoreInList(await fetchApiStores('/stores/nearest', 100), id) ??
    findStoreInList(await fetchApiStores('/stores', 100), id);

  if (!fallbackStore) {
    return null;
  }

  return normalizeMedicineStore(fallbackStore, 0);
};
