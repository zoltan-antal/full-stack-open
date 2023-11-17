import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../slices/userSlice';
import {
  createAcknowledgement,
  createError,
} from '../slices/notificationsSlice';

const LoginForm = ({ handleUsernameChange, handlePasswordChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser(username, password));
      setUsername('');
      setPassword('');
      dispatch(createAcknowledgement('successfully logged in', 5000));
    } catch (error) {
      dispatch(createError('wrong username or password', 5000));
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
