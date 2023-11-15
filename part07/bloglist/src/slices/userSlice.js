import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/loginService';
import blogService from '../services/blogService';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
  },
});

const loginUser = (username, password) => {
  return async (dispatch, getState) => {
    const user = await loginService.login({ username, password });
    localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('loggedBloglistUser');
    blogService.setToken(null);
    dispatch(setUser(null));
  };
};

const retrieveLoggedUser = () => {
  return (dispatch) => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
export { loginUser, logoutUser, retrieveLoggedUser };
