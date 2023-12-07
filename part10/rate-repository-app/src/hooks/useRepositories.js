import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({
  first = 5,
  sortMode = { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  searchKeyword = '',
} = {}) => {
  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: {
      first,
      orderBy: sortMode.orderBy,
      orderDirection: sortMode.orderDirection,
      searchKeyword,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first,
        orderBy: sortMode.orderBy,
        orderDirection: sortMode.orderDirection,
        searchKeyword,
      },
    });
  };

  return {
    repositories: data?.repositories,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
