import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable style={styles.container}>
      <Text color={'appBarText'} fontWeight={'bold'} fontSize={'subheading'}>
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
