import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { loading, data, refetch } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  const fetchRepository = async () => {
    await refetch();
  };

  useEffect(() => {
    fetchRepository();
  }, []);

  const repository = data ? data.repository : null;

  return { repository, loading, refetch: fetchRepository };
};

export default useRepository;
