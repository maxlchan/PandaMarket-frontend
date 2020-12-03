import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  color: white;
  background-color: ${( props ) => {
    return props.color || props.theme.colors.bamboo;
  }};
  box-shadow: ${({theme}) => theme.boxShadows.default};
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Button = ({ onClick, color, text }) => {
  return (
    <Wrapper onClick={onClick} color={color}>
      <h1>{text}</h1>
    </Wrapper>
  );
};

export default Button;
