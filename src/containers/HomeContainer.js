import React from 'react';
import styled from 'styled-components';
import Carousel from '../components/Carousel';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { ROUTES } from '../constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const HomeContainer = () => {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push(ROUTES.REGISTRATION);
  }

  return (
    <Wrapper>
      <Carousel />
      <Button onClick={handleButtonClick} text={'내 중고 상품 등록'}/>
    </Wrapper>
  );
};


export default HomeContainer;
