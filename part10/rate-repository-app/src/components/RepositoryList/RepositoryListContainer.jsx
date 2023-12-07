import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from '../RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortModePicker = (sortMode, setSortMode) => (
  <Picker
    selectedValue={sortMode}
    onValueChange={(itemValue) => setSortMode(itemValue)}
  >
    <Picker.Item label="Latest repositories" value="latest" />
    <Picker.Item label="Highest rated repositories" value="highestRated" />
    <Picker.Item label="Lowest rated repositories" value="lowestRated" />
  </Picker>
);

const RepositoryListContainer = ({
  repositories,
  navigate,
  sortMode,
  setSortMode,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => SortModePicker(sortMode, setSortMode)}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryListContainer;
