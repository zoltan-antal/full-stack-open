import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Togglable from './Togglable';
import BlogForm from './BlogForm';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogs
        .toSorted((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
