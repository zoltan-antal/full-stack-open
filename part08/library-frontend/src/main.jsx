import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App.jsx';
import Authors from './components/Authors.jsx';
import Books from './components/Books.jsx';
import NewBook from './components/NewBook.jsx';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
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
