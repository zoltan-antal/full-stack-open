import { createSlice } from '@reduxjs/toolkit';
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
    updateBlog(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) {
          return { ...blog, ...action.payload.updatedFields };
        }
        return blog;
      });
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
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

const likeBlog = (blogObject) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id,
    };
    const blogId = updatedBlog.id;
    delete updatedBlog.id;
    const returnedBlog = await blogService.update(blogId, updatedBlog);
    dispatch(
      updateBlog({ id: blogId, updatedFields: { likes: returnedBlog.likes } }),
    );
  };
};

const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export default blogsSlice.reducer;
export const { setBlogs, addBlog, updateBlog, removeBlog } = blogsSlice.actions;
export { initialiseBlogs, createBlog, likeBlog, deleteBlog };
