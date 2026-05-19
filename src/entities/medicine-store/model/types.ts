export type MedicineStoreStatus = 'open' | 'close';

export type ApiMedicineStore = {
  id?: string;
  _id?: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  isOpen: boolean;
};

export type MedicineStore = {
  id: string;
  name: string;
  rating: number;
  address: string[];
  phone: string;
  phoneHref: string;
  status: MedicineStoreStatus;
  workingHours: string;
  manager: string;
};

export type MedicineStorePageMeta = {
  totalItems: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
};

export type ApiMedicineStorePage = {
  items: ApiMedicineStore[];
  meta: MedicineStorePageMeta;
};

export type MedicineStorePage = {
  items: MedicineStore[];
  meta: MedicineStorePageMeta;
};

export type MedicineStoreSearchParams = {
  limit?: string | number;
  page?: string | number;
  random?: boolean | string;
};
