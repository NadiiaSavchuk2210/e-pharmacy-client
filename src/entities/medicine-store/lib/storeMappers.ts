import type {
  ApiMedicineStore,
  MedicineStore,
  MedicineStoreStatus,
} from '../model/types';

const getStoreStatus = (store: ApiMedicineStore): MedicineStoreStatus =>
  store.isOpen ? 'open' : 'close';

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
    status: getStoreStatus(store),
    workingHours: '08:00 - 22:00',
    manager: 'Store team',
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
