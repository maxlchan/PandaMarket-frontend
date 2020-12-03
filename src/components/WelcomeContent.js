import styled from 'styled-components';
import panda from '../assets/images/panda.png';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;

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
    }

    h1 {
      color: ${({ theme }) => theme.colors.bamboo};
      font-size: ${({ theme }) => theme.fontSizes.titleSize};
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: 800;
    }

    h3 {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }

  .img__welcome {
    width: 30%;
    min-width: 300px;
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
      <img className='img__welcome' src={panda} alt={'panda'} />
    </Wrapper>
  );
};

export default WelcomeContent;
