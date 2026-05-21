import {
  type ApiSuccessResponse,
  unwrapApiResponse,
} from '../core/apiResponse';
import { API_URL } from '../core/backend';

type ApiSearchParams =
  | URLSearchParams
  | Record<string, boolean | number | string | null | undefined>;

type ApiFetchOptions = {
  path: string;
  params?: ApiSearchParams;
  revalidate?: number;
  errorMessage?: string;
};

export class ApiFetchError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiFetchError';
  }
}

const createApiUrl = (path: string, params?: ApiSearchParams) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${API_URL}${normalizedPath}`);

  if (!params) {
    return url.toString();
  }

  if (params instanceof URLSearchParams) {
    params.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    return url.toString();
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

export const fetchApiData = async <T>({
  path,
  params,
  revalidate = 300,
  errorMessage = `Failed to fetch ${path}`,
}: ApiFetchOptions) => {
  const response = await fetch(createApiUrl(path, params), {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new ApiFetchError(`${errorMessage}: ${response.status}`, response.status);
  }

  const data = (await response.json()) as T | ApiSuccessResponse<T>;

  return unwrapApiResponse<T>(data);
};
