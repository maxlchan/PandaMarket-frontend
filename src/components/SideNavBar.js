import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 15vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.bamboo};
  overflow-x: hidden;
  padding-top: 30px;
`;

const HeaderSpace = styled.div`
  height: 7vh;
`;

const SideNavBar = ({ children }) => {
  return (
    <Wrapper>
      <HeaderSpace />
      {children.map((child) => child)}
    </Wrapper>
  );
};

export default SideNavBar;
