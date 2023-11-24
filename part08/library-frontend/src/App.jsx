import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useApolloClient, useSubscription } from '@apollo/client';
import { BOOK_ADDED } from './queries';

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem('libraryUserToken');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('libraryUserToken');
    client.resetStore();
    setToken(null);
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      console.log(addedBook);
    },
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <Link to={'/authors'}>authors</Link>
        <Link to={'/books'}>books</Link>
        {!token && (
          <>
            <Link to={'/login'}>login</Link>
          </>
        )}
        {token && (
          <>
            <Link to={'/addBook'}>add book</Link>
            <Link to={'/recommendations'}>recommend</Link>
            <a onClick={handleLogout} href="">
              logout
            </a>
          </>
        )}
      </div>
      <Outlet context={{ token, setToken }} />
    </div>
  );
};

export default App;
