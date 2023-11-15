import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '../slices/notificationsSlice';
import blogsReducer from '../slices/blogsSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});

export default store;
