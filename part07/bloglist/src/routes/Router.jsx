import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import BlogList from '../components/BlogList';
import UserList from '../components/UserList';
import User from '../components/User';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <BlogList />,
    },
    {
      path: 'blogs',
      element: <Navigate replace to={'/'} />,
    },
    {
      path: 'users',
      element: <UserList />,
    },
    {
      path: 'users/:id',
      element: <User />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
