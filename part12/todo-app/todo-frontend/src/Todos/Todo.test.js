import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders content', () => {
  const todo = {
    text: 'test',
    done: false,
  };

  const handleDelete = jest.fn();
  const handleComplete = jest.fn();

  render(
    <Todo
      todo={todo}
      onClickDelete={handleDelete}
      onClickComplete={handleComplete}
    />
  );

  screen.getByText('test');
});
