import type { OrderStatus, PaymentMethod } from '@/entities/order';

export { formatMoney } from '@/shared/lib/formatters';

const orderStatusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  paid: 'Paid',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash_on_delivery: 'Cash on delivery',
  bank: 'Bank',
};

export const formatOrderDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

export const formatOrderNumber = (id: string) => {
  return `#${id.slice(-8).toUpperCase()}`;
};

export const getOrderStatusLabel = (status: OrderStatus) => {
  return orderStatusLabels[status];
};

export const getPaymentMethodLabel = (paymentMethod: PaymentMethod) => {
  return paymentMethodLabels[paymentMethod];
};

export const getOrderStatusClassName = (status: OrderStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-brand-100 text-brand-700 dark:bg-surface-muted dark:text-text';
    case 'paid':
      return 'bg-mint-100 text-brand-700 dark:bg-surface-muted dark:text-text';
    case 'cancelled':
      return 'bg-danger-100 text-danger-500 dark:bg-danger-soft dark:text-danger';
    case 'pending':
    default:
      return 'bg-accent-soft text-brand-700 dark:bg-surface-muted dark:text-text';
  }
};
