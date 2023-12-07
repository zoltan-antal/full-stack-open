import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({
  sortMode = { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  searchKeyword = '',
} = {}) => {
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: sortMode.orderBy,
      orderDirection: sortMode.orderDirection,
      searchKeyword,
    },
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
