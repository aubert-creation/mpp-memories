import type { AxiosError, AxiosPromise } from 'axios';
import axios from 'axios';

export interface ApiError {
  statusCode?: number;
  error: string;
  message: string;
}

const PLATFORM = 'web';

export const apiClient = axios.create({
  headers: { platform: PLATFORM, language: 'fr-FR' },
});

export const initApi = (apiURL: string, language: string) => {
  apiClient.defaults.baseURL = apiURL;
  apiClient.defaults.headers.common.language = language ?? 'fr-FR';
};

export const apiWrapper = async <T>(call: AxiosPromise<T>) => {
  try {
    const { data } = await call;
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const error = err as AxiosError<ApiError>;
      if (error.response) {
        console.error('[API]', error.response.data);

        // Expected an error object to be thrown.eslint@typescript-eslint/no-throw-literal
        // throw error.response.data
        throw Object.assign(new Error(error.response.data.message), error.response.data);
      }
    }
    const error: ApiError = {
      error: 'Unknown',
      message: 'An unknown error occured',
    };
    console.error('[API]', error);

    // Expected an error object to be thrown.eslint@typescript-eslint/no-throw-literal
    // throw error;
    throw Object.assign(new Error(error.error), error);
  }
};
