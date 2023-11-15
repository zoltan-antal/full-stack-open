import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('BlogForm', () => {
  test('calls event handler correctly', async () => {
    const createBlogMock = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlogMock} />);

    const titleInput = screen.getByLabelText('title', { exact: false });
    const authorInput = screen.getByLabelText('author', { exact: false });
    const urlInput = screen.getByLabelText('url', { exact: false });
    const createButton = screen.getByText('create');

    await user.type(titleInput, 'title');
    await user.type(authorInput, 'author');
    await user.type(urlInput, 'url');
    await user.click(createButton);

    expect(createBlogMock.mock.calls).toHaveLength(1);
    expect(createBlogMock.mock.calls[0][0].title).toBe('title');
    expect(createBlogMock.mock.calls[0][0].author).toBe('author');
    expect(createBlogMock.mock.calls[0][0].url).toBe('url');
  });
});
