import { QueryClient } from 'react-query';

export const staleTimeConfig = {
  halfMinute: 1000 * 30,
  oneMinute: 1000 * 60, // 1 minute
  fiveMinutes: 1000 * 60 * 5, // 5 minutes
  oneHour: 1000 * 60 * 60, // 1 Heure,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: staleTimeConfig.fiveMinutes,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
