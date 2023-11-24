import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = () => {
  const { token, setToken } = useOutletContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem('libraryUserToken', token);
      setToken(token);
      navigate('/');
    }
  }, [result.data, setToken, navigate]);

  const handleLogin = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
