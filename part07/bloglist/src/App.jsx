import { useState, useEffect, useRef } from 'react';
import loginService from './services/loginService';
import blogService from './services/blogService';
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

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const acknowledgementMessage = useSelector(
    (state) => state.notifications.acknowledgementMessage,
  );
  const errorMessage = useSelector((state) => state.notifications.errorMessage);

  useEffect(() => {
    dispatch(initialiseBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject, user));
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
      const user = await loginService.login({ username, password });
      localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(createAcknowledgement('successfully logged in', 5000));
    } catch (error) {
      dispatch(createError('wrong username or password', 5000));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedBloglistUser');
    setUser(null);
    blogService.setToken(null);
    dispatch(createAcknowledgement('successfully logged out', 5000));
  };

  const handleLike = async (blogObject) => {
    dispatch(likeBlog(blogObject));
  };

  const handleRemove = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      try {
        dispatch(deleteBlog(blogObject.id));
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
