import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding || '2% 5%'};
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  font-size: ${({ theme }) => theme.fontSizes.small};
  transition: all 0.05s ease-in-out;
  cursor: pointer;
  color: white;
  background-color: ${({ color, theme }) => {
    return color || theme.colors.green;
  }};

  &:hover {
    transform: scale(1.05);
    background-color: ${({ color, theme }) => {
      return !color && theme.colors.hoverGreen;
    }};
  }

  &:active {
    transform: scale(1);
  }

  &:disabled {
    opacity: 50%;
  }

  .button__title {
    min-width: 25px;
    pointer-events: none;
  }
`;

const Button = ({
  id,
  className,
  disabled,
  onClick,
  color,
  width,
  padding,
  text,
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
      <h1 className='button__title'>{text}</h1>
    </Wrapper>
  );
};

export default Button;
