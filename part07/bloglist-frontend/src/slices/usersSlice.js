import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

const initialiseUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
export { initialiseUsers };
