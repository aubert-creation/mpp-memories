import type { QueryFunction, QueryKey, UseQueryOptions } from 'react-query';
import { useQuery } from 'react-query';
import type { ApiError } from '@config/axiosConfig';
import { useAuthContext } from '@contexts/authContext';

const useAuthenticatedQuery = <TQueryFnData = unknown, TData = TQueryFnData>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TQueryFnData>,
  options?: UseQueryOptions<TQueryFnData, ApiError, TData>
) => {
  const { token } = useAuthContext();
  const enabled = !!token;

  const query = useQuery<TQueryFnData, ApiError, TData>(queryKey, queryFn, {
    ...options,
    enabled: enabled && (options?.enabled ?? true),
  });
  return { ...query, refetch: enabled ? query.refetch : () => {} };
};

export default useAuthenticatedQuery;
