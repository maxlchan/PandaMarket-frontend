import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding || '3% 5%'};
  color: white;
  background-color: ${(props) => {
    return props.color || props.theme.colors.green;
  }};
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  transition: all 0.05s ease-in-out;

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 50%;
  }

  h1 {
    min-width: 25px;
  }
`;

const Button = ({
  disabled,
  className,
  onClick,
  color,
  text,
  width,
  padding,
}) => {
  return (
    <Wrapper
      className={className}
      disabled={disabled}
      onClick={onClick}
      color={color}
      width={width}
      padding={padding}
    >
      <h1>{text}</h1>
    </Wrapper>
  );
};

export default Button;
