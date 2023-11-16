import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;

    case 'CLEAR_USER':
      return null;

    default:
      return state;
  }
};

// Action creators

const setUser = (userObject) => ({ type: 'SET_USER', payload: userObject });

const clearUser = () => ({ type: 'CLEAR_USER' });

// Custom hooks

const useUser = () => {
  const { store } = useContext(StoreContext);
  return store.user;
};

export default userReducer;
export { setUser, clearUser };
export { useUser };
