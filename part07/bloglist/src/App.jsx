import { useState, useEffect, useRef, useContext } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import { StoreContext } from './context/StoreContext';
import {
  setAcknowledgement,
  clearAcknowledgement,
  setError,
  clearError,
  useAcknowledgementMessage,
  useErrorMessage,
} from './reducers/notificationsReducer';
import { setUser, useUser } from './reducers/userReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(StoreContext);
  const user = useUser();
  const acknowledgementMessage = useAcknowledgementMessage();
  const errorMessage = useErrorMessage();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create(blogObject);
    returnedBlog.user = { username: user.username, name: user.name };
    setBlogs([...blogs, returnedBlog]);
    dispatch(
      setAcknowledgement(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      ),
    );
    setTimeout(() => {
      dispatch(clearAcknowledgement());
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername('');
      setPassword('');
      dispatch(setAcknowledgement('successfully logged in'));
      setTimeout(() => {
        dispatch(clearAcknowledgement());
      }, 5000);
    } catch (error) {
      dispatch(setError('wrong username or password'));
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedBloglistUser');
    dispatch(setUser(null));
    blogService.setToken(null);
    dispatch(setAcknowledgement('successfully logged out'));
    setTimeout(() => {
      dispatch(clearAcknowledgement());
    }, 5000);
  };

  const handleLike = async (blogObject) => {
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id,
    };
    delete updatedBlog.id;

    const returnedBlog = await blogService.update(blogObject.id, updatedBlog);
    setBlogs(
      blogs.map((blog) => {
        if (blog.id === returnedBlog.id) {
          return { ...blog, likes: returnedBlog.likes };
        }
        return blog;
      }),
    );
  };

  const handleRemove = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      try {
        await blogService.remove(blogObject.id);
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        dispatch(setAcknowledgement('blog successfully removed'));
        setTimeout(() => {
          dispatch(clearAcknowledgement());
        }, 5000);
      } catch (error) {
        dispatch(setError('unauthorised to remove this blog'));
        setTimeout(() => {
          dispatch(clearError());
        }, 5000);
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
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
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
