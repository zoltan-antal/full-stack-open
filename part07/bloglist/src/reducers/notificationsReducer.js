const notificationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACKNOWLEDGEMENT':
      return { ...state, acknowledgementMessage: action.payload };

    case 'CLEAR_ACKNOWLEDGEMENT':
      return { ...state, acknowledgementMessage: null };

    case 'SET_ERROR':
      return { ...state, errorMessage: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, errorMessage: null };

    default:
      return state;
  }
};

export default notificationsReducer;
