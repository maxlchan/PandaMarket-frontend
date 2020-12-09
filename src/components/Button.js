import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  padding: 15px 30px;
  color: white;
  background-color: ${(props) => {
    return props.color || props.theme.colors.bamboo;
  }};
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
  h1 {
    min-width: 25px;
  }
`;

const Button = ({ className, onClick, color, text, width }) => {
  return (
    <Wrapper
      className={className}
      onClick={onClick}
      color={color}
      width={width}
    >
      <h1>{text}</h1>
    </Wrapper>
  );
};

export default Button;
