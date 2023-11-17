import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '../slices/notificationsSlice';
import blogsReducer from '../slices/blogsSlice';
import userReducer from '../slices/userSlice';
import usersReducer from '../slices/usersSlice';

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
});

export default store;
