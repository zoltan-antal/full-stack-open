import { configureStore } from '@reduxjs/toolkit';
import anectodeReducer from '../reducers/anecdoteReducer';
import filterReducer from '../reducers/filterReducer';

const store = configureStore({
  reducer: {
    anecdotes: anectodeReducer,
    filter: filterReducer,
  },
});

export default store;
