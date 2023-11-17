import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import Router from './routes/Router';
import { initialiseBlogs } from './slices/blogsSlice';
import { retrieveLoggedUser } from './slices/userSlice';
import { initialiseUsers } from './slices/usersSlice';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const acknowledgementMessage = useSelector(
    (state) => state.notifications.acknowledgementMessage,
  );
  const errorMessage = useSelector((state) => state.notifications.errorMessage);

  useEffect(() => {
    const fetchBlogs = async () => {
      await dispatch(initialiseBlogs());
    };
    fetchBlogs();

    const fetchUsers = async () => {
      await dispatch(initialiseUsers());
    };
    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    dispatch(retrieveLoggedUser());
  }, [dispatch]);

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification
          message={acknowledgementMessage}
          type={'acknowledgement'}
        />
        <Notification message={errorMessage} type={'error'} />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={acknowledgementMessage} type={'acknowledgement'} />
      <Notification message={errorMessage} type={'error'} />
      <p>
        {user.name} logged in <LogoutButton />
      </p>
      <Router />
    </div>
  );
};

export default App;
