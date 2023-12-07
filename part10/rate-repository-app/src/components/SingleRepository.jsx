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
  const { reviews } = useReviews(id);

  if (loading) {
    return null;
  }

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} title={'user'} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </>
      )}
    />
  );
};

export default SingleRepository;
