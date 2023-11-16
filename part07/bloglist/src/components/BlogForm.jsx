import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useDispatch } from '../reducers/rootReducer';
import {
  clearAcknowledgement,
  setAcknowledgement,
} from '../reducers/notificationsReducer';

const BlogForm = ({ blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleBlogChange = (field, event) => {
    setNewBlog({ ...newBlog, [field]: event.target.value });
  };

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };
    blogFormRef.current.toggleVisibility();
    newBlogMutation.mutate(blogObject);
    dispatch(
      setAcknowledgement(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
      ),
    );
    setTimeout(() => {
      dispatch(clearAcknowledgement());
    }, 5000);
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
