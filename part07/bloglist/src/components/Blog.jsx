import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../slices/blogsSlice';
import {
  createAcknowledgement,
  createError,
} from '../slices/notificationsSlice';

const Blog = ({ blog, user }) => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    '& p': {
      margin: 0,
      background: 'red',
    },
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'hide' : 'view'}
        </button>
      </div>
      {expanded && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user.name || blog.user.username}</div>
          {user.username === blog.user.username && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
