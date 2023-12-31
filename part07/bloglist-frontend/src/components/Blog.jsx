import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { likeBlog, deleteBlog, addBlogComment } from '../slices/blogsSlice';
import { initialiseUsers } from '../slices/usersSlice';
import {
  createAcknowledgement,
  createError,
} from '../slices/notificationsSlice';

const Blog = () => {
  const [newComment, setNewComment] = useState('');

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
        await dispatch(initialiseUsers());
        dispatch(createAcknowledgement('blog successfully removed', 5000));
        navigate('/blogs');
      } catch (error) {
        dispatch(createError('unauthorised to remove this blog', 5000));
      }
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    await dispatch(addBlogComment(blog.id, newComment));
    setNewComment('');
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <ul className="blog-info">
        <li>
          <a href={blog.url}>{blog.url}</a>
        </li>
        <li>
          likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </li>
        <li>
          added by{' '}
          <Link to={`/users/${blog.user.id}`}>
            {blog.user.name || blog.user.username}
          </Link>
        </li>
        {user.username === blog.user.username && (
          <li>
            <button onClick={() => handleRemove(blog)}>remove blog</button>
          </li>
        )}
      </ul>
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul className="comment-list">
        {blog.comments.map((comment, i) => (
          <li key={`${comment}-${id}`}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
