import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  color: ${({ color, theme }) => color || theme.colors.light_black};
  font-size: ${({ theme }) => theme.fontSizes.small};

  &:hover {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

const NavItem = ({ to, name, onClick, color }) => {
  return (
    <Link to={to}>
      <StyledText onClick={onClick} color={color}>
        <h1>{name}</h1>
      </StyledText>
    </Link>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default NavItem;
