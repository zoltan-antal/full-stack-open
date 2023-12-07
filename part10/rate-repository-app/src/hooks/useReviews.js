import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = ({ first = 5, id }) => {
  const { loading, data, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    variables: { first, id },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first,
        id,
      },
    });
  };

  return {
    reviews: data?.repository.reviews,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useReviews;
