import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { generateDateToText } from '../utils';
import Button from './Button';
import Card from './Card';
import AuctionDetailContent from '../components/AuctionDetailContent';

const sliderSettings = {
  dots: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .detail__left {
    width: 45%;
    height: 80%;
    background-color: yellow;
  }

  .detail__right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    height: 80%;

    .detail__right__header {
      width: 100%;
      text-align: center;

      .detail__title {
        font-size: ${({ theme }) => theme.fontSizes.base};
      }

      .detail__initialPrice {
        width: 50;
        font-size: ${({ theme }) => theme.fontSizes.xl};
      }
    }

    .detail__right__main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 70%;
    }
  }
`;

const DetailContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 3% 0;

  .detail__content__title {
    width: 30%;
    padding-left: 30px;
  }

  .detail__content__payload {
    width: 80%;
  }

  .detail__content__description {
    max-height: 200px;
    word-break: break-all;
  }
`;

const AuctionDetail = ({ auction, onClick }) => {
  const {
    description,
    initialPrice,
    startedDateTime,
    picturesUrl,
    reservedUser,
    title,
    itemName,
    _id: auctionId,
  } = auction;

  return (
    <Wrapper>
      <div className='detail__left'>
        asdasddfdsfsdas
        {/* <Slider {...sliderSettings}>
          {picturesUrl.map((pictureUrl) => (
            <div className='detail__img' key={pictureUrl}>
              <img src={pictureUrl} />
            </div>
          ))}
        </Slider> */}
      </div>
      <div className='detail__right'>
        <div className='detail__right__header'>
          <div className='detail__title'>{itemName}</div>
          <div className='detail__initialPrice'>시작가 {initialPrice}원</div>
        </div>

        <div className='detail__right__main'>
          <AuctionDetailContent item={'경매 제목'} content={title} />
          <AuctionDetailContent item={'상품명'} content={itemName} />
          <AuctionDetailContent
            item={'경매 일시'}
            content={generateDateToText(startedDateTime)}
          />
          <AuctionDetailContent item={'시작 가격'} content={initialPrice} />
          <AuctionDetailContent
            item={'현재 예약자'}
            content={reservedUser.length}
          />
          <AuctionDetailContent item={'상품 정보'} content={description} />
        </div>
        <Button onClick={() => onClick(auctionId)} text={'경매 예약하기'} />
      </div>
    </Wrapper>
  );
};

export default AuctionDetail;
