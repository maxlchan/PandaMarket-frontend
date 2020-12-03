import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  background-color: ${({ color }) => color};
`;

const Card = ({ color, children }) => {
  return (
    <Wrapper color={color}>
      {children}
    </Wrapper>
  );
};

export default Card;
