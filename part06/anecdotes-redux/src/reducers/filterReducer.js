import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    filterChange(state, action) {
      return action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { filterChange } = filterSlice.actions;
