import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '../slices/notificationsSlice';

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
});

export default store;
