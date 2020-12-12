import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding || '2% 6%'};
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  font-size: ${({ theme }) => theme.fontSizes.small};
  transition: all 0.05s ease-in-out;
  cursor: pointer;
  color: white;
  background-color: ${(props) => {
    return props.color || props.theme.colors.green;
  }};
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 50%;
  }

  h1 {
    min-width: 25px;
    pointer-events: none;
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
  id,
}) => {
  return (
    <Wrapper
      id={id}
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
