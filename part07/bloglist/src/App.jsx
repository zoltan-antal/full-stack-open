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
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(StoreContext);
  const user = useUser();
  const acknowledgementMessage = useAcknowledgementMessage();
  const errorMessage = useErrorMessage();
  const queryClient = useQueryClient();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });
  const blogs = result.data;

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: ([id, blogObject]) => blogService.update(id, blogObject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      dispatch(setAcknowledgement('blog successfully removed'));
      setTimeout(() => {
        dispatch(clearAcknowledgement());
      }, 5000);
    },
    onError: () => {
      dispatch(setError('unauthorised to remove this blog'));
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    },
  });

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    newBlogMutation.mutate(blogObject);
    dispatch(
      setAcknowledgement(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
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
    updateBlogMutation.mutate([blogObject.id, updatedBlog]);
  };

  const handleRemove = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      deleteBlogMutation.mutate(blogObject.id);
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
      {(() => {
        if (result.isLoading) {
          return <div>loading data...</div>;
        }
        return blogs
          .sort((a, b) => (a.likes > b.likes ? -1 : 1))
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              onLike={handleLike}
              onRemove={handleRemove}
            />
          ));
      })()}
      {/* {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            onLike={handleLike}
            onRemove={handleRemove}
          />
        ))} */}
    </div>
  );
};

export default App;
