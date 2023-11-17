import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { initialiseBlogs } from './slices/blogsSlice';
import { retrieveLoggedUser } from './slices/userSlice';
import { initialiseUsers } from './slices/usersSlice';
import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const acknowledgementMessage = useSelector(
    (state) => state.notifications.acknowledgementMessage,
  );
  const errorMessage = useSelector((state) => state.notifications.errorMessage);

  useEffect(() => {
    dispatch(retrieveLoggedUser());

    const fetchBlogs = async () => {
      await dispatch(initialiseBlogs());
    };
    fetchBlogs();

    const fetchUsers = async () => {
      await dispatch(initialiseUsers());
    };
    fetchUsers();
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
      <Nav />
      <Notification message={acknowledgementMessage} type={'acknowledgement'} />
      <Notification message={errorMessage} type={'error'} />
      <h2>blog app</h2>
      <Outlet />
    </div>
  );
};

export default App;
