import { createJsonApiClient } from './apiClient.factory';
import { attachAuthInterceptors } from './authInterceptors';

export { refreshAuthSession } from './authRefresh';

export const publicApiClient = createJsonApiClient();

export const apiClient = createJsonApiClient();

attachAuthInterceptors(apiClient);
