import type {
  Order,
  PaymentMethod,
  ShippingInfo,
} from '@/entities/order';
import type { ApiProduct, Product } from '@/entities/product';

export type {
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  ShippingInfo,
} from '@/entities/order';

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

export type DeliveryQuotePayload = {
  address: string;
};

export type DeliveryQuote = {
  subtotal: number;
  deliveryFee: number;
  additionalFee: number;
  freeDeliveryThreshold: number;
  amountToFreeDelivery: number;
  message: string;
};

export type CheckoutCartPayload = {
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  comment?: string;
};

export type CheckoutCartResponse = {
  order: Order;
};
