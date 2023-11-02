import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleBlogChange = (field, event) => {
    setNewBlog({ ...newBlog, [field]: event.target.value });
  };

  const addBlog = async (event) => {
    event.preventDefault();

    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <form
      className="blog-form"
      onSubmit={addBlog}
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
