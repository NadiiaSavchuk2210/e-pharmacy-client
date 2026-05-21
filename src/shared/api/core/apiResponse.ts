export type ApiSuccessResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export const unwrapApiResponse = <T>(
  response: T | ApiSuccessResponse<T>,
): T => {
  if (
    response &&
    typeof response === 'object' &&
    'statusCode' in response &&
    'data' in response
  ) {
    return response.data as T;
  }

  return response as T;
};
