import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserNumberIcon = ({ className, userNumber }) => {
  return (
    <div className={className}>
      <FontAwesomeIcon icon={faUser} />
      <span>{userNumber}</span>
    </div>
  );
};

UserNumberIcon.propTypes = {
  className: PropTypes.string,
  userNumber: PropTypes.number,
};

export default UserNumberIcon;
