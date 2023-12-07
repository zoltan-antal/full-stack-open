import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({
  orderBy = 'CREATED_AT',
  orderDirection = 'DESC',
} = {}) => {
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
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
