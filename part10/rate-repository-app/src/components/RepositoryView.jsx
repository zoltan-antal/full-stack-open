import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

const RepositoryView = () => {
  const id = useParams().id;
  const { repository, loading } = useRepository(id);

  if (loading) {
    return null;
  }

  return <RepositoryItem item={repository} repositoryView={true} />;
};

export default RepositoryView;
