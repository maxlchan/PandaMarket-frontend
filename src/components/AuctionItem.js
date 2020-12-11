import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 92%;
  height: 100%;
  min-width: 200px;
  min-height: 250px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: white;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadows.deep};
    transform: scale(1.05);

    .item__top {
      background-image: url(${({ imageUrl }) =>
        imageUrl[1] ? imageUrl[1] : imageUrl[0]});
    }
  }

  .item__top {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 250px;
    max-height: 300px;
    background-image: url(${({ imageUrl }) => imageUrl[0]});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-bottom: 1px dotted black;
  }

  .item__bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 120px;

    .item__bottom__title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 95%;
      text-align: center;
      vertical-align: center;
    }

    .item__bottom__price {
      font-weight: ${({ theme }) => theme.fontWeights.strong};
      font-size: 20px;
    }
  }
`;

const AuctionItem = ({ imageUrl, title, initialPrice, isStarted, onClick }) => {
  return (
    <ItemWrapper imageUrl={imageUrl}>
      <div className='item__top'></div>
      <div className='item__bottom'>
        <h1 className='item__bottom__title'>{title}</h1>
        <h2 className='item__bottom__price'>시작가격 - {initialPrice}원</h2>
        <span>{isStarted ? '경매 진행중' : '경매 예약중'}</span>
        <Button onClick={onClick} text={'상세보기'} />
      </div>
    </ItemWrapper>
  );
};

export default AuctionItem;
