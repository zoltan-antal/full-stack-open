import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { likeBlog, deleteBlog } from '../slices/blogsSlice';
import {
  createAcknowledgement,
  createError,
} from '../slices/notificationsSlice';

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);

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
        navigate('/blogs');
      } catch (error) {
        dispatch(createError('unauthorised to remove this blog', 5000));
      }
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}{' '}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>added by {blog.user.name || blog.user.username}</div>
      {user.username === blog.user.username && (
        <button onClick={() => handleRemove(blog)}>remove</button>
      )}
    </div>
  );
};

export default Blog;
