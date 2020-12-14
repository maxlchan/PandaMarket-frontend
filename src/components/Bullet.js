import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  left: 10%;
  top: 10%;
  background-color: #ea4065;
  padding: 10px;
`;

const Bullet = ({ text }) => {
  return (
    <Wrapper>
      <span>{text}</span>
    </Wrapper>
  );
};

export default Bullet;
