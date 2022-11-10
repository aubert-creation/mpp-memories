import { apiClient, apiWrapper } from '@config/axiosConfig';
import type { IResponse } from '@customTypes/app';

const getAppInitStatuses = () => apiWrapper(apiClient.get<IResponse>('/'));

export default getAppInitStatuses;
