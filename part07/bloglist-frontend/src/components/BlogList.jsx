import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Togglable from './Togglable';
import BlogForm from './BlogForm';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <ul className="blog-list">
        {blogs
          .toSorted((a, b) => (a.likes > b.likes ? -1 : 1))
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} - {blog.author}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BlogList;
