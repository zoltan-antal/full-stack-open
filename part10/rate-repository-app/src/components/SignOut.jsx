import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useEffect } from 'react';

const SignOut = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  useEffect(() => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  }, []);
};

export default SignOut;
