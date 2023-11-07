import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVoteOf(state, action) {
      return state.map((anecdote) => {
        if (anecdote.id === action.payload) {
          return { ...anecdote, votes: anecdote.votes + 1 };
        }
        return anecdote;
      });
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

const registerVoteFor = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const votes =
      state.anecdotes.find((anecdote) => anecdote.id === id).votes + 1;
    await anecdoteService.updateVotes(id, votes);
    dispatch(incrementVoteOf(id));
  };
};

export default anecdoteSlice.reducer;
export const { incrementVoteOf, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export { initializeAnecdotes, createAnecdote, registerVoteFor };
