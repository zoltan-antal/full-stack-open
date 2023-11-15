import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '../slices/notificationsSlice';
import blogsReducer from '../slices/blogsSlice';

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    blogs: blogsReducer,
  },
});

export default store;
