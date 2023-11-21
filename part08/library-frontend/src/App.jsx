import { Link, Outlet } from 'react-router-dom';

const App = () => {
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
        <Link to={'/addBook'}>add book</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
