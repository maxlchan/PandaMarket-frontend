import React from 'react';
import styled from 'styled-components';
import Carousel from '../components/Carousel';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { ROUTES } from '../constants';
import { useSelector } from 'react-redux';
import { auctionsOnAirSelector } from '../redux/auction/auctios.selector';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HomeContainer = () => {
  const auctionsOnAir = useSelector(auctionsOnAirSelector);
  const history = useHistory();

  const handleButtonClick = () => {
    history.push(ROUTES.REGISTERATION);
  };

  return (
    <Wrapper>
      <Carousel contents={auctionsOnAir} />
      <Button
        onClick={handleButtonClick}
        padding='15px 20px'
        text={'내 중고물품 경매하기'}
      />
    </Wrapper>
  );
};

export default HomeContainer;
