import React from 'react';
import styled from 'styled-components';
import panda from '../assets/images/panda.png';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .text__welcome__wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;

    h2 {
      color: ${({ theme }) => theme.colors.bamboo};
      font-size: ${({ theme }) => theme.fontSizes.base};
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: 500;
    }

    h1 {
      margin-top: 10px;
      margin-bottom: 10px;
      color: ${({ theme }) => theme.colors.bamboo};
      font-size: ${({ theme }) => theme.fontSizes.titleSize};
      font-weight: ${({ theme }) => theme.fontWeights.strong};
    }

    h3 {
      font-size: ${({ theme }) => theme.fontSizes.small};
      font-weight: ${({ theme }) => theme.fontWeights.strong};
    }
  }

  .img__welcome__wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;

    img {
      width: 100%;
      max-width: 400px;
      min-width: 200px;
    }
  }
`;

const WelcomeContent = () => {
  return (
    <Wrapper>
      <div className='text__welcome__wrap'>
        <h2>사람의 마음을 얻는 자, 중고를 판다</h2>
        <h1>판다 마켓</h1>
        <h3>당신의 중고물품을</h3>
        <h3>실시간 라이브 방송을 통해 경매해봐요!</h3>
      </div>
      <div className='img__welcome__wrap'>
        <img src={panda} alt={'panda'} />
      </div>
    </Wrapper>
  );
};

export default WelcomeContent;
