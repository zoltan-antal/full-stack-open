import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import notificationsReducer from './notificationsReducer';

const rootReducer = (state, action) => {
  return {
    notifications: notificationsReducer(state.notifications, action),
  };
};

// Custom hooks

const useDispatch = () => {
  const { dispatch } = useContext(StoreContext);
  return dispatch;
};

export default rootReducer;
export { useDispatch };
