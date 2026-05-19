import type {
  ApiMedicineStore,
  MedicineStore,
  MedicineStoreStatus,
} from '../model/types';

const getStoreStatus = (
  store: ApiMedicineStore,
  index: number,
): MedicineStoreStatus => {
  if (typeof store.isOpen === 'boolean') {
    return store.isOpen ? 'open' : 'close';
  }

  const normalizedStatus = store.status?.toLowerCase();

  if (normalizedStatus === 'open' || normalizedStatus === 'close') {
    return normalizedStatus;
  }

  return (store.rating ?? index) <= 1 ? 'close' : 'open';
};

export const getStoreSlug = (
  store: Pick<ApiMedicineStore, 'name' | 'phone'>,
) =>
  `${store.name}-${store.phone}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getPhoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const normalizeMedicineStore = (
  store: ApiMedicineStore,
  index: number,
): MedicineStore => {
  const address = store.city ? [store.address, store.city] : [store.address];
  const id = store.id ?? store._id ?? getStoreSlug(store);

  return {
    id,
    name: store.name,
    rating: store.rating ?? 0,
    address,
    phone: store.phone,
    phoneHref: getPhoneHref(store.phone),
    status: getStoreStatus(store, index),
    workingHours: store.workingHours ?? '08:00 - 22:00',
    manager: store.manager ?? 'Store team',
  };
};

export const findStoreInList = (stores: ApiMedicineStore[], id: string) => {
  return (
    stores.find(
      (store) =>
        store.id === id || store._id === id || getStoreSlug(store) === id,
    ) ?? null
  );
};
