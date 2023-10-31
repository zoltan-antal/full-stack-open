import { useState } from 'react';

const Blog = ({ blog, onLike }) => {
  const [expanded, setExpanded] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setExpanded(!expanded)}>view</button>
      </p>
      {expanded && (
        <>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button onClick={() => onLike(blog)}>like</button>
          </p>
          <p>{blog.user.name || blog.user.username}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
