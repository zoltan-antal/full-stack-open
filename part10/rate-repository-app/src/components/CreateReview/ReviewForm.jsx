import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from '../FormikTextInput';
import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'stretch',
    gap: 15,
    padding: 15,
    backgroundColor: theme.colors.cardBackground,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors.primaryText,
  },
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText} fontWeight="bold" testID="submitButton">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
