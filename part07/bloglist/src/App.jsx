import { useState, useEffect, useRef, useContext } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import { StoreContext } from './context/StoreContext';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const { store, dispatch } = useContext(StoreContext);
  // const [acknowledgementMessage, setAcknowledgementMessage] = useState(null);
  // const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
    const returnedBlog = await blogService.create(blogObject);
    returnedBlog.user = { username: user.username, name: user.name };
    setBlogs([...blogs, returnedBlog]);
    // setAcknowledgementMessage(
    //   `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
    // );
    // setTimeout(() => {
    //   setAcknowledgementMessage(null);
    // }, 5000);
    dispatch({
      type: 'SET_ACKNOWLEDGEMENT',
      payload: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_ACKNOWLEDGEMENT',
      });
    }, 5000);
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
      // setAcknowledgementMessage('successfully logged in');
      // setTimeout(() => {
      //   setAcknowledgementMessage(null);
      // }, 5000);
      dispatch({
        type: 'SET_ACKNOWLEDGEMENT',
        payload: 'successfully logged in',
      });
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_ACKNOWLEDGEMENT',
        });
      }, 5000);
    } catch (error) {
      // setErrorMessage('wrong username or password');
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
      dispatch({
        type: 'SET_ERROR',
        payload: 'wrong username or password',
      });
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_ERROR',
        });
      }, 5000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedBloglistUser');
    setUser(null);
    blogService.setToken(null);
    // setAcknowledgementMessage('successfully logged out');
    // setTimeout(() => {
    //   setAcknowledgementMessage(null);
    // }, 5000);
    dispatch({
      type: 'SET_ACKNOWLEDGEMENT',
      payload: 'successfully logged out',
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_ACKNOWLEDGEMENT',
      });
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
        // setAcknowledgementMessage('blog successfully removed');
        // setTimeout(() => {
        //   setAcknowledgementMessage(null);
        // }, 5000);
        dispatch({
          type: 'SET_ACKNOWLEDGEMENT',
          payload: 'blog successfully removed',
        });
        setTimeout(() => {
          dispatch({
            type: 'CLEAR_ACKNOWLEDGEMENT',
          });
        }, 5000);
      } catch (error) {
        // setErrorMessage('unauthorised to remove this blog');
        // setTimeout(() => {
        //   setErrorMessage(null);
        // }, 5000);
        dispatch({
          type: 'SET_ERROR',
          payload: 'unauthorised to remove this blog',
        });
        setTimeout(() => {
          dispatch({
            type: 'CLEAR_ERROR',
          });
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
          message={store.notifications.acknowledgementMessage}
          type={'acknowledgement'}
        />
        <Notification
          message={store.notifications.errorMessage}
          type={'error'}
        />
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
      <Notification
        message={store.notifications.acknowledgementMessage}
        type={'acknowledgement'}
      />
      <Notification message={store.notifications.errorMessage} type={'error'} />
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
