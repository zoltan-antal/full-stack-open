import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../slices/blogsSlice';
import { createAcknowledgement } from '../slices/notificationsSlice';

const BlogForm = ({ blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleBlogChange = (field, event) => {
    setNewBlog({ ...newBlog, [field]: event.target.value });
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };
    await dispatch(createBlog(blogObject, user));

    blogFormRef.current.toggleVisibility();
    dispatch(
      createAcknowledgement(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        5000,
      ),
    );
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <form
      className="blog-form"
      onSubmit={handleCreate}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <label>
        title:
        <input
          value={newBlog.title}
          onChange={(event) => handleBlogChange('title', event)}
        />
      </label>
      <label>
        author:
        <input
          value={newBlog.author}
          onChange={(event) => handleBlogChange('author', event)}
        />
      </label>
      <label>
        url:
        <input
          value={newBlog.url}
          onChange={(event) => handleBlogChange('url', event)}
        />
      </label>
      <button className="submit-button" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
