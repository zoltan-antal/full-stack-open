import { useEffect, useRef } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import {
  useAcknowledgementMessage,
  useErrorMessage,
} from './reducers/notificationsReducer';
import { setUser, useUser } from './reducers/userReducer';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from './reducers/rootReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useUser();
  const acknowledgementMessage = useAcknowledgementMessage();
  const errorMessage = useErrorMessage();

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
      {(() => {
        if (result.isLoading) {
          return <div>loading data...</div>;
        }
        return blogs
          .sort((a, b) => (a.likes > b.likes ? -1 : 1))
          .map((blog) => <Blog key={blog.id} blog={blog} />);
      })()}
    </div>
  );
};

export default App;
