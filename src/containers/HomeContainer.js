import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from '../components/Carousel';
import Button from '../components/Button';
import { auctionsOnAirSelector } from '../redux/auction/auctios.selector';
import { ROUTES } from '../constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeContainer = () => {
  const auctionsOnAir = useSelector(auctionsOnAirSelector);
  const history = useHistory();

  const handleJoinButtonClick = (auctionId) => {
    history.push(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.BROADCAST}`);
  };

  return (
    <Wrapper>
      <Carousel contents={auctionsOnAir} onClick={handleJoinButtonClick} />
      <Button
        onClick={() => history.push(ROUTES.REGISTERATION)}
        padding='15px 20px'
        text={'내 중고물품 경매하기'}
      />
    </Wrapper>
  );
};

export default HomeContainer;
