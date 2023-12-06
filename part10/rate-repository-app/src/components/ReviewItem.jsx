import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const ReviewItem = ({ review }) => {
  const scoreContainerSize = 45;
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      padding: 10,
      alignItems: 'flex-start',
      backgroundColor: theme.colors.cardBackground,
    },
    scoreContainer: {
      borderColor: theme.colors.primary,
      borderStyle: 'solid',
      borderWidth: 2,
      borderRadius: scoreContainerSize / 2,
      width: scoreContainerSize,
      height: scoreContainerSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scoreText: {
      color: theme.colors.primary,
    },
    info: {
      display: 'flex',
      flex: 1,
    },
    text: {
      marginTop: 5,
    },
  });

  const createdAt = new Date(review.createdAt);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text
          style={styles.scoreText}
          fontSize={'subheading'}
          fontWeight={'bold'}
        >
          {review.rating}
        </Text>
      </View>
      <View style={styles.info}>
        <Text fontWeight={'bold'}>{review.user.username}</Text>
        <Text color="textSecondary">
          {createdAt.toLocaleString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
