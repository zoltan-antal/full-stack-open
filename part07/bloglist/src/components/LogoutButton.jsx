import blogService from '../services/blogs';
import { setUser } from '../reducers/userReducer';
import {
  clearAcknowledgement,
  setAcknowledgement,
} from '../reducers/notificationsReducer';
import { useDispatch } from '../reducers/rootReducer';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.removeItem('loggedBloglistUser');
    dispatch(setUser(null));
    blogService.setToken(null);
    dispatch(setAcknowledgement('successfully logged out'));
    setTimeout(() => {
      dispatch(clearAcknowledgement());
    }, 5000);
  };

  return <button onClick={handleClick}>logout</button>;
};

export default LogoutButton;
