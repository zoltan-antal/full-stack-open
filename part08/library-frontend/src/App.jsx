import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

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
