import type { ApiProduct, Product } from '@/entities/product';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

export type ApiCartProduct = ApiProduct & {
  _id: string;
};

export type ApiCartItem = {
  product: ApiCartProduct;
  quantity: number;
};

export type ApiCart = {
  items: ApiCartItem[];
  totalItems: number;
  totalPrice: number;
};

export type UpdateCartPayload = {
  productId: string;
  quantity: number;
};

export type PaymentMethod = 'cash_on_delivery' | 'bank';

export type ShippingInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type DeliveryQuotePayload = {
  address: string;
  subtotal?: number;
};

export type DeliveryQuote = {
  deliveryFee: number;
  additionalFee: number;
  message: string;
};

export type CheckoutCartPayload = {
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  comment?: string;
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

export type CheckoutCartResponse = {
  order: Order;
};
