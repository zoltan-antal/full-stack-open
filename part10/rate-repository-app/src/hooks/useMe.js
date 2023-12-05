import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = () => {
  const { loading, data, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  const fetchMe = async () => {
    await refetch();
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const me = data ? data.me : null;

  return { me, loading, refetch: fetchMe };
};

export default useMe;
