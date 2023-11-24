import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App.jsx';
import Authors from './components/Authors.jsx';
import Books from './components/Books.jsx';
import NewBook from './components/NewBook.jsx';
import Login from './components/Login.jsx';
import Recommendations from './components/Recommendations.jsx';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('libraryUserToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/authors" />,
      },
      {
        path: 'authors',
        element: <Authors />,
      },
      {
        path: 'books',
        element: <Books />,
      },
      {
        path: 'addBook',
        element: <NewBook />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'recommendations',
        element: <Recommendations />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
