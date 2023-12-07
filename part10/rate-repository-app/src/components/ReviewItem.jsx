import { Pressable, StyleSheet, View, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';

const ReviewItem = ({ review, mode, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const scoreContainerSize = 45;
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      gap: 10,
      padding: 10,
      backgroundColor: theme.colors.cardBackground,
    },
    reviewDetailsContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
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
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
    },
    button: {
      flexGrow: 1,
      padding: 12,
      borderRadius: 5,
    },
    defaultButton: {
      backgroundColor: theme.colors.primary,
    },
    dangerButton: {
      backgroundColor: theme.colors.error,
    },
    buttonText: {
      textAlign: 'center',
      color: theme.colors.primaryText,
    },
  });

  const createdAt = new Date(review.createdAt);

  const handleReviewDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview(review.id);
            await refetch();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewDetailsContainer}>
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
          <Text fontWeight={'bold'}>
            {(() => {
              switch (mode) {
                case 'repository':
                  return review.user.username;

                case 'user':
                  return review.repository.fullName;

                default:
                  return null;
              }
            })()}
          </Text>
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
      {mode === 'user' && (
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.button, styles.defaultButton]}
            onPress={() => navigate(`/repositories/${review.repository.id}`)}
          >
            <Text style={styles.buttonText} fontWeight={'bold'}>
              View repository
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.dangerButton]}
            onPress={handleReviewDelete}
          >
            <Text style={styles.buttonText} fontWeight={'bold'}>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
