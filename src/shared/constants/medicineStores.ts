export type MedicineStoreStatus = 'open' | 'close';

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

export const medicineStores: MedicineStore[] = [
  {
    id: '1',
    name: 'Huge Sale',
    rating: 2,
    address: ['Albenia G83', 'Seoul'],
    phone: '717-24-2429',
    phoneHref: 'tel:717242429',
    status: 'open',
    workingHours: '08:00 - 22:00',
    manager: 'Olivia Carter',
  },
  {
    id: '2',
    name: 'Tremblay and...',
    rating: 3,
    address: ['Kretoria F45', 'Castlerea'],
    phone: '595-08-2102',
    phoneHref: 'tel:595082102',
    status: 'open',
    workingHours: '09:00 - 21:00',
    manager: 'Ethan Wright',
  },
  {
    id: '3',
    name: 'Fahey-Batz',
    rating: 1,
    address: ['Kretoria 11007', 'Champerico'],
    phone: '506-84-9725',
    phoneHref: 'tel:506849725',
    status: 'close',
    workingHours: '10:00 - 19:00',
    manager: 'Mia Brooks',
  },
  {
    id: '4',
    name: 'Baumbach LLC',
    rating: 3,
    address: ['Pretoria F11', 'Houxiang'],
    phone: '132-90-3868',
    phoneHref: 'tel:132903868',
    status: 'open',
    workingHours: '08:30 - 20:30',
    manager: 'Noah Adams',
  },
  {
    id: '5',
    name: 'Howell Group',
    rating: 5,
    address: ['Porto 4785-103', 'Abelheira'],
    phone: '279-16-6959',
    phoneHref: 'tel:279166959',
    status: 'close',
    workingHours: '09:00 - 18:00',
    manager: 'Ava Mitchell',
  },
  {
    id: '6',
    name: 'Williamson-G...',
    rating: 4,
    address: ['Albaira 6233', 'Arrufo'],
    phone: '792-44-1782',
    phoneHref: 'tel:792441782',
    status: 'open',
    workingHours: '07:30 - 23:00',
    manager: 'Liam Turner',
  },
];

export const getMedicineStoreById = (storeId: string) =>
  medicineStores.find(({ id }) => id === storeId);
