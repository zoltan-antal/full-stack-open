import { useDispatch } from 'react-redux';
import anecdoteService from '../services/anecdotes';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`you created '${content}'`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
