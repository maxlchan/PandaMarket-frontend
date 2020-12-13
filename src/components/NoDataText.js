import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.h1`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const NoDataText = () => {
  return (
    <Wrapper>
      <span>등록된 정보가 아직 없습니다.</span>
    </Wrapper>
  );
};

export default NoDataText;
