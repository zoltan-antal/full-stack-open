import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Togglable from './Togglable';
import BlogForm from './BlogForm';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

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
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogs
        .toSorted((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} - {blog.author}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
