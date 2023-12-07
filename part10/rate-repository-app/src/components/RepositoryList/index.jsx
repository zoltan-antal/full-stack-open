import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const [sortMode, setSortMode] = useState('latest');
  const { repositories } = useRepositories(
    (() => {
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
    })()
  );
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      sortMode={sortMode}
      setSortMode={setSortMode}
    />
  );
};

export default RepositoryList;
