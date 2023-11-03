import { useSelector, useDispatch } from 'react-redux';
import { incrementVoteOf } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const vote = (id) => {
    dispatch(incrementVoteOf(id));
  };

  return (
    <>
      {anecdotes
        .toSorted((a, b) => (a.votes > b.votes ? -1 : 1))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
