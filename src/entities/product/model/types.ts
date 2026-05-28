export type ProductDescriptionSection = {
  title: string;
  body: string;
};

export type ApiProduct = {
  _id?: string;
  id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
  discount?: string | number;
  description?: string;
  descriptionSections?: ProductDescriptionSection[];
  sourceUrl?: string;
};

export type Product = Omit<ApiProduct, '_id'> & {
  apiId?: string;
};

export type ProductPageMeta = {
  totalItems: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
};

export type ProductPage = {
  items: Product[];
  meta: ProductPageMeta;
};

export type ApiProductPage = {
  items: ApiProduct[];
  meta: ProductPageMeta;
};

export type ProductSearchParams = {
  category?: string;
  name?: string;
  discount?: string | number;
  limit?: string | number;
  page?: string | number;
};
