export type ApiErrorResponse = {
  message?: string | string[];
  error?: string;
};

export const getApiErrorMessage = (
  data: ApiErrorResponse | undefined,
  fallbackMessage: string,
) => {
  if (Array.isArray(data?.message)) {
    return data.message.join('\n');
  }

  return data?.message ?? data?.error ?? fallbackMessage;
};
