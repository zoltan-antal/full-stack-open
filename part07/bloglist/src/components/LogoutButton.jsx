import { useDispatch } from 'react-redux';
import { logoutUser } from '../slices/userSlice';
import { createAcknowledgement } from '../slices/notificationsSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    dispatch(createAcknowledgement('successfully logged out', 5000));
  };

  return <button onClick={handleClick}>logout</button>;
};

export default LogoutButton;
