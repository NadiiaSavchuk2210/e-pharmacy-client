import type { Order, OrdersPageMeta, OrdersResponse } from '@/entities/order';

import { ORDERS_PER_PAGE } from '../config';

export type ApiOrdersResponse =
  | Order[]
  | {
      orders?: Order[];
      items?: Order[];
      meta?: Partial<OrdersPageMeta>;
    };

type OrdersPageParams = {
  limit?: string | number;
  page?: string | number;
};

type NormalizedOrdersPageParams = {
  limit: number;
  page: number;
};

const parseInteger = (
  value: string | number | undefined,
  fallback: number,
) => {
  const parsedValue =
    typeof value === 'number' ? value : Number.parseInt(value ?? '', 10);

  return Number.isFinite(parsedValue) ? Math.floor(parsedValue) : fallback;
};

const getPositiveInteger = (
  value: string | number | undefined,
  fallback: number,
) => {
  const parsedValue = parseInteger(value, fallback);

  return parsedValue > 0 ? parsedValue : fallback;
};

const getNonNegativeInteger = (
  value: string | number | undefined,
  fallback: number,
) => {
  const parsedValue = parseInteger(value, fallback);

  return parsedValue >= 0 ? parsedValue : fallback;
};

const getResponseOrders = (response: ApiOrdersResponse) => {
  if (Array.isArray(response)) {
    return response;
  }

  return response.orders ?? response.items ?? [];
};

const getResponseMeta = (response: ApiOrdersResponse) => {
  return Array.isArray(response) ? undefined : response.meta;
};

const getFallbackTotalPages = (totalItems: number, perPage: number) =>
  Math.max(Math.ceil(totalItems / perPage), 1);

const normalizeOrdersMeta = (
  meta: Partial<OrdersPageMeta> | undefined,
  totalItemsFallback: number,
  { page, limit }: NormalizedOrdersPageParams,
): OrdersPageMeta => {
  const perPage = getPositiveInteger(meta?.perPage, limit);
  const totalItems = getNonNegativeInteger(meta?.totalItems, totalItemsFallback);
  const totalPages = getPositiveInteger(
    meta?.totalPages,
    getFallbackTotalPages(totalItems, perPage),
  );
  const currentPage = Math.min(
    getPositiveInteger(meta?.currentPage, page),
    totalPages,
  );

  return {
    totalItems,
    currentPage,
    perPage,
    totalPages,
  };
};

const paginateOrders = (orders: Order[], meta: OrdersPageMeta) => {
  const startIndex = (meta.currentPage - 1) * meta.perPage;
  const endIndex = meta.currentPage * meta.perPage;

  return orders.slice(startIndex, endIndex);
};

export const getOrdersPageParams = ({
  limit = ORDERS_PER_PAGE,
  page = 1,
}: OrdersPageParams = {}): NormalizedOrdersPageParams => ({
  limit: getPositiveInteger(limit, ORDERS_PER_PAGE),
  page: getPositiveInteger(page, 1),
});

export const normalizeOrdersResponse = (
  response: ApiOrdersResponse,
  params: NormalizedOrdersPageParams,
): OrdersResponse => {
  const orders = getResponseOrders(response);
  const responseMeta = getResponseMeta(response);
  const meta = normalizeOrdersMeta(responseMeta, orders.length, params);

  return {
    orders: responseMeta ? orders : paginateOrders(orders, meta),
    meta,
  };
};
