import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useApolloClient, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle([...allBooks, addedBook]),
    };
  });
};

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
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
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
