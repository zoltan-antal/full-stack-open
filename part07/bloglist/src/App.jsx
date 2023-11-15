import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  initialiseBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './slices/blogsSlice';
import {
  createAcknowledgement,
  createError,
} from './slices/notificationsSlice';
import { loginUser, logoutUser, retrieveLoggedUser } from './slices/userSlice';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    await dispatch(createBlog(blogObject, user));
    dispatch(
      createAcknowledgement(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        5000,
      ),
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser(username, password));
      setUsername('');
      setPassword('');
      dispatch(createAcknowledgement('successfully logged in', 5000));
    } catch (error) {
      dispatch(createError('wrong username or password', 5000));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(createAcknowledgement('successfully logged out', 5000));
  };

  const handleLike = async (blogObject) => {
    await dispatch(likeBlog(blogObject));
  };

  const handleRemove = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      try {
        await dispatch(deleteBlog(blogObject.id));
        dispatch(createAcknowledgement('blog successfully removed', 5000));
      } catch (error) {
        dispatch(createError('unauthorised to remove this blog', 5000));
      }
    }
  };

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
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={(e) => setUsername(e.target.value)}
          handlePasswordChange={(e) => setPassword(e.target.value)}
          username={username}
          password={password}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={acknowledgementMessage} type={'acknowledgement'} />
      <Notification message={errorMessage} type={'error'} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .toSorted((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            onLike={handleLike}
            onRemove={handleRemove}
          />
        ))}
    </div>
  );
};

export default App;
