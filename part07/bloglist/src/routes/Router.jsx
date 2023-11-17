import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import App from '../App';
import BlogList from '../components/BlogList';
import Blog from '../components/Blog';
import UserList from '../components/UserList';
import User from '../components/User';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <BlogList />,
        },
        {
          path: 'blogs',
          element: <Navigate replace to={'/'} />,
        },
        {
          path: 'blogs/:id',
          element: <Blog />,
        },
        {
          path: 'users',
          element: <UserList />,
        },
        {
          path: 'users/:id',
          element: <User />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
