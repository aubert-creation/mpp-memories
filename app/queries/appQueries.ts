import getAppInitStatuses from '@api/appApi';
import type { IResponse } from '@customTypes/app';
import useAuthenticatedQuery from '@hooks/useAuthenticatedQuery';

export const APP_QUERY_KEY = 'appQueryKey';

export const useAppInitStatuses = () =>
  useAuthenticatedQuery<IResponse>([APP_QUERY_KEY], () => getAppInitStatuses());
