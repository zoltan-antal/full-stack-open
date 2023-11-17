import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const Nav = () => {
  const user = useSelector((state) => state.user);

  return (
    <nav>
      <ul className="left">
        <li>
          <Link to="/blogs">blogs</Link>
        </li>
        <li>
          <Link to="/users">users</Link>
        </li>
      </ul>
      <ul className="right">
        <li>{user.name} logged in</li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
