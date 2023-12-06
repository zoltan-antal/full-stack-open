import { Image, StyleSheet, View, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../theme';
import Text from './Text';
import abbreviateThousands from '../utils/abbreviateThousands';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardBackground,
    display: 'flex',
    padding: 15,
    gap: 15,
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  info: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 5,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
  },
});

const RepositoryItem = ({ item, repositoryView }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.main}>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text fontWeight={'bold'} fontSize={'subheading'}>
            {item.fullName}
          </Text>
          <Text color={'textSecondary'}>{item.description}</Text>
          <Text color={'primary'} style={{ padding: 5, borderRadius: 5 }}>
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text fontWeight={'bold'}>
            {abbreviateThousands(item.stargazersCount)}
          </Text>
          <Text color={'textSecondary'}>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={'bold'}>
            {abbreviateThousands(item.forksCount)}
          </Text>
          <Text color={'textSecondary'}>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={'bold'}>
            {abbreviateThousands(item.reviewCount)}
          </Text>
          <Text color={'textSecondary'}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={'bold'}>
            {abbreviateThousands(item.ratingAverage)}
          </Text>
          <Text color={'textSecondary'}>Rating</Text>
        </View>
      </View>
      {repositoryView && (
        <Pressable onPress={() => Linking.openURL(item.url)}>
          <Text
            color={'primary'}
            fontWeight={'bold'}
            style={{ padding: 15, borderRadius: 5, textAlign: 'center' }}
          >
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
