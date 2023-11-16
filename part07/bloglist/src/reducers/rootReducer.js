import notificationsReducer from './notificationsReducer';

const rootReducer = (state, action) => {
  return {
    notifications: notificationsReducer(state.notifications, action),
  };
};

export default rootReducer;
