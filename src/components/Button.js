import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  padding: ${({ padding }) => padding || '2% 5%'};
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-bottom: 5px;

  transition: all 0.05s ease-in-out;
  cursor: pointer;
  color: white;
  background-color: ${(props) => {
    return props.color || props.theme.colors.green;
  }};

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 50%;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverGreen};
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
