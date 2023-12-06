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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        testID="usernameInput"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        testID="passwordInput"
        secureTextEntry
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText} fontWeight="bold" testID="submitButton">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
