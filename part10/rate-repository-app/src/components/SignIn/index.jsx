import { useNavigate } from 'react-router-native';
import useSignIn from '../../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer initialValues={initialValues} onSubmit={onSubmit} />;
};

export default SignIn;
