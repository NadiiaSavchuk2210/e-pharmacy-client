import axios from 'axios';

import { API_BASE_URL } from './apiClient.config';

export const createJsonApiClient = () =>
  axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
