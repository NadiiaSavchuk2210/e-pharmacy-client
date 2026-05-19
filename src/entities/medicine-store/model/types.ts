export type ApiMedicineStoreStatus = 'OPEN' | 'CLOSE' | 'open' | 'close';
export type MedicineStoreStatus = 'open' | 'close';

export type ApiMedicineStore = {
  id?: string;
  _id?: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  status?: ApiMedicineStoreStatus;
  isOpen?: boolean;
  workingHours?: string;
  manager?: string;
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
