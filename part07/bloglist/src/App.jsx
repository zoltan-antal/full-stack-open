import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import { initialiseBlogs } from './slices/blogsSlice';
import { retrieveLoggedUser } from './slices/userSlice';
import BlogList from './components/BlogList';
import Users from './components/Users';

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
  }, [dispatch]);

  useEffect(() => {
    dispatch(retrieveLoggedUser());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <BlogList />,
    },
    {
      path: 'users',
      element: <Users />,
    },
  ]);

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
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
