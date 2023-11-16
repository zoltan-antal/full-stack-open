import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { initialiseBlogs } from './slices/blogsSlice';
import { retrieveLoggedUser } from './slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const acknowledgementMessage = useSelector(
    (state) => state.notifications.acknowledgementMessage,
  );
  const errorMessage = useSelector((state) => state.notifications.errorMessage);

  useEffect(() => {
    const fetchBlogs = async () => {
      await dispatch(initialiseBlogs());
    };
    fetchBlogs();
  }, [dispatch]);

  useEffect(() => {
    dispatch(retrieveLoggedUser());
  }, [dispatch]);

  const blogFormRef = useRef();

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification
          message={acknowledgementMessage}
          type={'acknowledgement'}
        />
        <Notification message={errorMessage} type={'error'} />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={acknowledgementMessage} type={'acknowledgement'} />
      <Notification message={errorMessage} type={'error'} />
      <p>
        {user.name} logged in <LogoutButton />
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogs
        .toSorted((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default App;
