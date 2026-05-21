import { AUTH_REFRESH_PATH } from './apiClient.config';
import { createJsonApiClient } from './apiClient.factory';
import {
  type ApiSuccessResponse,
  unwrapApiResponse,
} from '../core/apiResponse';
import {
  clearAuthSession,
  getAuthTokenFromPayload,
  persistAuthSession,
  type AuthTokenPayload,
} from '../session/authSession';

const refreshClient = createJsonApiClient();

let refreshAuthSessionRequest: Promise<AuthTokenPayload> | null = null;

export const refreshAuthSession = async () => {
  if (!refreshAuthSessionRequest) {
    refreshAuthSessionRequest = refreshClient
      .post<ApiSuccessResponse<AuthTokenPayload> | AuthTokenPayload>(
        AUTH_REFRESH_PATH,
        null,
        {
          skipAuthHeader: true,
          skipAuthRefresh: true,
        },
      )
      .then(({ data }) => {
        const session = unwrapApiResponse(data);
        const accessToken = getAuthTokenFromPayload(session);

        if (!accessToken) {
          throw new Error('Refresh response did not include an access token');
        }

        persistAuthSession(session);

        return session;
      })
      .catch((error) => {
        clearAuthSession();
        throw error;
      })
      .finally(() => {
        refreshAuthSessionRequest = null;
      });
  }

  return refreshAuthSessionRequest;
};

export const refreshAccessToken = async () => {
  const session = await refreshAuthSession();
  const accessToken = getAuthTokenFromPayload(session);

  if (!accessToken) {
    throw new Error('Refresh response did not include an access token');
  }

  return accessToken;
};
