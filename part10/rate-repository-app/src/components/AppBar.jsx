import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { me, loading } = useMe();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repositories'} route={'/'} />
        {!loading && me && (
          <AppBarTab text={'Create a review'} route={'/createReview'} />
        )}
        {!loading && me && (
          <AppBarTab text={'My reviews'} route={'/myReviews'} />
        )}
        {!loading && !me && <AppBarTab text={'Sign in'} route={'/signIn'} />}
        {!loading && !me && <AppBarTab text={'Sign up'} route={'/signUp'} />}
        {!loading && me && <AppBarTab text={'Sign out'} route={'/signOut'} />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
