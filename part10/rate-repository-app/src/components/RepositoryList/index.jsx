import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const [sortMode, setSortMode] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchKeywordDebounced] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories({
    sortMode: (() => {
      switch (sortMode) {
        case 'latest':
          return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };

        case 'highestRated':
          return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };

        case 'lowestRated':
          return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };

        default:
          return {};
      }
    })(),
    searchKeyword: searchKeywordDebounced,
  });
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      sortMode={sortMode}
      setSortMode={setSortMode}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
