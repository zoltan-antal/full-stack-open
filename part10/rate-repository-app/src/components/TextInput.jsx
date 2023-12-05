import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderColor: theme.colors.lightBorder,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.input,
    style,
    error && { borderColor: theme.colors.error },
  ];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
