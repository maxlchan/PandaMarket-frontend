import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserIcon = ({ className, userNumber }) => {
  return (
    <div className={className}>
      <FontAwesomeIcon icon={faUser} />
      <span>{userNumber}</span>
    </div>
  );
};

export default UserIcon;
