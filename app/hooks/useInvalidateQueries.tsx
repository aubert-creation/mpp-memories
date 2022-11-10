import { useQueryClient } from 'react-query';

const useInvalidateQueries = (queries: (string | string[])[]) => {
  const queryClient = useQueryClient();
  const invalidateQueries = () => {
    queries.forEach((query) => {
      queryClient.invalidateQueries(query);
    });
  };
  return invalidateQueries;
};

export default useInvalidateQueries;
