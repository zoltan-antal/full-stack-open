import { FlatList, StyleSheet, View } from 'react-native';
import useMe from '../hooks/useMe';
import ReviewItem from './ReviewItem';

const ItemSeparator = () => {
  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });

  return <View style={styles.separator} />;
};

const MyReviews = () => {
  const { me, loading } = useMe({ includeReviews: true });

  if (loading) {
    return null;
  }

  const reviewNodes = me ? me.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} title={'repository'} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
