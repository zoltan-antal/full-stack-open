import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

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

const abbreviateThousands = (value) => {
  if (value < 1000) {
    return value;
  }
  return Math.round(value / 100) / 10 + 'k';
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
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
          <Text>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={'bold'}>
            {abbreviateThousands(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={'bold'}>
            {abbreviateThousands(item.reviewCount)}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={'bold'}>
            {abbreviateThousands(item.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
