import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (id) => {
  const { loading, data, refetch } = useQuery(GET_REVIEWS, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  const fetchReviews = async () => {
    await refetch();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const reviews = data ? data.repository.reviews : null;

  return { reviews, loading, refetch: fetchReviews };
};

export default useReviews;
