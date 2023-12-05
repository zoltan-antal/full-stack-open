import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const fetchRepositories = async () => {
    await refetch();
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const repositories = data ? data.repositories : null;

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
