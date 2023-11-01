import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return <div className={`notification ${type}`}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Notification;
