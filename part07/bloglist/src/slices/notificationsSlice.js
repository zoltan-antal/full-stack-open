import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  acknowledgementMessage: null,
  errorMessage: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    setAcknowledgement(state, action) {
      state.acknowledgementMessage = action.payload;
    },
    clearAcknowledgement(state, action) {
      state.acknowledgementMessage = null;
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    clearError(state, action) {
      state.errorMessage = null;
    },
  },
});

const createAcknowledgement = (message, timeout) => {
  return (dispatch) => {
    dispatch(setAcknowledgement(message));
    setTimeout(() => {
      dispatch(clearAcknowledgement());
    }, timeout);
  };
};

const createError = (message, timeout) => {
  return (dispatch) => {
    dispatch(setError(message));
    setTimeout(() => {
      dispatch(clearError());
    }, timeout);
  };
};

export default notificationsSlice.reducer;
export const {
  setAcknowledgement,
  clearAcknowledgement,
  setError,
  clearError,
} = notificationsSlice.actions;
export { createAcknowledgement, createError };
