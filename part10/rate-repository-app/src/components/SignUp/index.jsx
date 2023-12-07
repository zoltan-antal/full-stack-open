import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../../hooks/useSignUp';
import SignUpForm from './SignUpForm';
import useSignIn from '../../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Minimum length for username is 5 characters.')
    .max(30, 'Maximum length for username is 30 characters.'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Minimum length for password is 5 characters.')
    .max(30, 'Maximum length for password is 30 characters.'),
  passwordConfirm: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords do not match.'),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
