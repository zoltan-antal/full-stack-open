import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useDispatch } from '../reducers/rootReducer';
import blogService from '../services/blogs';
import {
  clearAcknowledgement,
  clearError,
  setAcknowledgement,
  setError,
} from '../reducers/notificationsReducer';
import { useUser } from '../reducers/userReducer';

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const user = useUser();
  const queryClient = useQueryClient();

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
};

export default Blog;
