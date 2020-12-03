import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100px;
  height: 50px;
  color: white;
  background-color: ${({ props }) => {
    return props.color || props.theme.colors.bamboo;
  }};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Button = ({ color, text }) => {
  return (
    <Wrapper color={color}>
      <h1></h1>
    </Wrapper>
  );
};

export default Button;
