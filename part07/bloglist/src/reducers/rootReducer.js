import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import notificationsReducer from './notificationsReducer';
import userReducer from './userReducer';

const rootReducer = (state, action) => {
  return {
    notifications: notificationsReducer(state.notifications, action),
    user: userReducer(state.user, action),
  };
};

// Custom hooks

const useDispatch = () => {
  const { dispatch } = useContext(StoreContext);
  return dispatch;
};

export default rootReducer;
export { useDispatch };
