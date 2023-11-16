import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setUser } from '../reducers/userReducer';
import {
  clearAcknowledgement,
  clearError,
  setAcknowledgement,
  setError,
} from '../reducers/notificationsReducer';
import { useDispatch } from '../reducers/rootReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername('');
      setPassword('');
      dispatch(setAcknowledgement('successfully logged in'));
      setTimeout(() => {
        dispatch(clearAcknowledgement());
      }, 5000);
    } catch (error) {
      dispatch(setError('wrong username or password'));
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
