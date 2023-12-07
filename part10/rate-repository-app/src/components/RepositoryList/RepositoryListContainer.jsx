import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import RepositoryItem from '../RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchbar: {
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 0,
    borderRadius: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortMode, setSortMode, searchKeyword, setSearchKeyword } =
      this.props;

    return (
      <View>
        <Searchbar
          placeholder="Filter repositories"
          onChangeText={setSearchKeyword}
          value={searchKeyword}
          style={styles.searchbar}
        />
        <Picker
          selectedValue={sortMode}
          onValueChange={(itemValue) => setSortMode(itemValue)}
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item
            label="Highest rated repositories"
            value="highestRated"
          />
          <Picker.Item label="Lowest rated repositories" value="lowestRated" />
        </Picker>
      </View>
    );
  };

  render() {
    const { repositories, navigate, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}
