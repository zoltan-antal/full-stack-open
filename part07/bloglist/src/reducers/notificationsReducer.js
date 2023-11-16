import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const notificationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACKNOWLEDGEMENT':
      return { ...state, acknowledgementMessage: action.payload };

    case 'CLEAR_ACKNOWLEDGEMENT':
      return { ...state, acknowledgementMessage: null };

    case 'SET_ERROR':
      return { ...state, errorMessage: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, errorMessage: null };

    default:
      return state;
  }
};

// Action creators

const setAcknowledgement = (message) => ({
  type: 'SET_ACKNOWLEDGEMENT',
  payload: message,
});

const clearAcknowledgement = () => ({ type: 'CLEAR_ACKNOWLEDGEMENT' });

const setError = (message) => ({ type: 'SET_ERROR', payload: message });

const clearError = () => ({ type: 'CLEAR_ERROR' });

// Custom hooks

const useNotifications = () => {
  const { store } = useContext(StoreContext);
  return store.notifications;
};

const useAcknowledgementMessage = () => {
  return useNotifications().acknowledgementMessage;
};

const useErrorMessage = () => {
  return useNotifications().errorMessage;
};

export default notificationsReducer;
export { setAcknowledgement, clearAcknowledgement, setError, clearError };
export { useNotifications, useAcknowledgementMessage, useErrorMessage };
