import { createSlice } from '@reduxjs/toolkit';
import blogs from '../services/blogService';
import blogService from '../services/blogService';

const initialState = [];

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

const createBlog = (blogObject, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    const userId = newBlog.user;
    newBlog.user = { username: user.username, name: user.name, id: userId };
    dispatch(addBlog(newBlog));
  };
};

export default blogsSlice.reducer;
export const { setBlogs, addBlog } = blogsSlice.actions;
export { initialiseBlogs, createBlog };
