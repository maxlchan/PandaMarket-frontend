import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
`;

const CloseButton = ({ onClick }) => {
  return <StyledSpan onClick={onClick}>❌</StyledSpan>;
};

export default CloseButton;
