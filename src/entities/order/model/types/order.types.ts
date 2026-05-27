export type PaymentMethod = 'cash_on_delivery' | 'bank';

export type ShippingInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

export type OrderStatus = 'pending' | 'paid' | 'cancelled' | 'completed';

export type Order = {
  id: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  additionalFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
};

export type OrdersResponse = {
  orders: Order[];
};
