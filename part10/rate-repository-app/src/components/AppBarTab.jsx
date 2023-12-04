import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

const AppBarTab = ({ text, route }) => {
  return (
    <Link to={route} style={styles.container}>
      <Text color={'appBarText'} fontWeight={'bold'} fontSize={'subheading'}>
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
