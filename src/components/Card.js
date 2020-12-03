import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  background-image: url(${({ backgroundImg }) => backgroundImg});
  background-position: center;
  background-size: cover;
  background-color: ${({ color }) => color};
`;

const Card = ({ color, backgroundImg, children }) => {
  return (
    <Wrapper color={color} backgroundImg={backgroundImg}>
      {children}
    </Wrapper>
  );
};

export default Card;
