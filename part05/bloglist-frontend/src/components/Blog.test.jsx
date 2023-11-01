import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog', () => {
  test('renders the correct content initially', () => {
    const blogMock = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: Math.floor(Math.random() * 100),
      user: {
        username: 'username',
        name: 'name',
      },
    };
    const userMock = {
      username: 'username',
      name: 'name',
      token: 'token',
    };
    const onLikeMock = jest.fn();
    const onRemoveMock = jest.fn();

    const container = render(
      <Blog
        blog={blogMock}
        user={userMock}
        onLike={onLikeMock}
        onRemove={onRemoveMock}
      />
    ).container;
    const blogElement = container.querySelector('.blog');

    expect(blogElement).toHaveTextContent(blogMock.title);
    expect(blogElement).toHaveTextContent(blogMock.author);
    expect(blogElement).not.toHaveTextContent(blogMock.url);
    expect(blogElement).not.toHaveTextContent(blogMock.likes);
    expect(blogElement).not.toHaveTextContent('likes');
  });

  test('renders the correct content when blog is expanded', async () => {
    const blogMock = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: Math.floor(Math.random() * 100),
      user: {
        username: 'username',
        name: 'name',
      },
    };
    const userMock = {
      username: 'username',
      name: 'name',
      token: 'token',
    };
    const onLikeMock = jest.fn();
    const onRemoveMock = jest.fn();

    const container = render(
      <Blog
        blog={blogMock}
        user={userMock}
        onLike={onLikeMock}
        onRemove={onRemoveMock}
      />
    ).container;
    const blogElement = container.querySelector('.blog');

    const user = userEvent.setup();
    const viewButton = screen.getByText('view', { container: blogElement });
    await user.click(viewButton);

    expect(blogElement).toHaveTextContent(blogMock.title);
    expect(blogElement).toHaveTextContent(blogMock.author);
    expect(blogElement).toHaveTextContent(blogMock.url);
    expect(blogElement).toHaveTextContent(blogMock.likes);
    expect(blogElement).toHaveTextContent('likes');
  });

  test('like button calls like handler correctly', async () => {
    const blogMock = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: Math.floor(Math.random() * 100),
      user: {
        username: 'username',
        name: 'name',
      },
    };
    const userMock = {
      username: 'username',
      name: 'name',
      token: 'token',
    };
    const onLikeMock = jest.fn();
    const onRemoveMock = jest.fn();

    const container = render(
      <Blog
        blog={blogMock}
        user={userMock}
        onLike={onLikeMock}
        onRemove={onRemoveMock}
      />
    ).container;
    const blogElement = container.querySelector('.blog');

    const user = userEvent.setup();
    const viewButton = screen.getByText('view', { container: blogElement });
    await user.click(viewButton);
    const likeButton = screen.getByText('like', { container: blogElement });
    const likeClicks = 2;
    for (let i = 0; i < likeClicks; i++) {
      await user.click(likeButton);
    }

    expect(onLikeMock.mock.calls).toHaveLength(likeClicks);
  });
});
