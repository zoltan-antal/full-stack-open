import { Pressable, Text, View } from 'react-native';
import FormikTextInput from './FormikTextInput';

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit}>
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
