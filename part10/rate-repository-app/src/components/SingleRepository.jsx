import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import useReviews from '../hooks/useReviews';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} repositoryView={true} />;
};

const ItemSeparator = () => {
  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });

  return <View style={styles.separator} />;
};

const SingleRepository = () => {
  const id = useParams().id;
  const { repository, loading } = useRepository(id);
  const { reviews, fetchMore } = useReviews({ first: 4, id });

  if (loading) {
    return null;
  }

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    fetchMore();
    console.log('You have reached the end of the list');
  };

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} mode={'repository'} />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
