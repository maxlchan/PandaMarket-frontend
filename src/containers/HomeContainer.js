import React, { useEffect } from 'react';
import styled from 'styled-components';
import Carousel from '../components/Carousel';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { ROUTES } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuctions } from '../redux/auction/auction.reducer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HomeContainer = () => {
  const auctions = useSelector((state) => state.auctions.data);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAuctions());
  }, []);

  const handleButtonClick = () => {
    history.push(ROUTES.REGISTERATION);
  };

  return (
    <Wrapper>
      <Carousel contents={auctions} />
      <Button onClick={handleButtonClick} text={'내 중고 상품 등록'} />
    </Wrapper>
  );
};

export default HomeContainer;
