import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { generateDateToText } from '../utils';
import Button from './Button';
import AuctionDetailContent from '../components/AuctionDetailContent';

const sliderSettings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;

  .detail__left {
    width: 35%;

    .slick-track {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 100%;
      background-color: white;
    }
  }

  .detail__right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 45%;
    height: 80%;
    box-shadow: ${({ theme }) => theme.boxShadows.default};
    background-color: white;
    padding: 30px;

    .detail__right__header {
      width: 100%;
      text-align: center;
      margin-bottom: 30px;

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

const AuctionDetail = ({ auction, onClick }) => {
  const {
    description,
    initialPrice,
    startedDateTime,
    picturesUrl,
    reservedUser,
    title,
    itemName,
    created_at,
    _id: auctionId,
  } = auction;

  return (
    <Wrapper>
      <div className='detail__left'>
        <div className='slider__wrap'>
          <Slider {...sliderSettings}>
            {picturesUrl.map((pictureUrl) => (
              <div className='detail__left__img' key={pictureUrl}>
                <img src={pictureUrl} />
              </div>
            ))}
          </Slider>
        </div>
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
            item={'등록 일시'}
            content={generateDateToText(created_at)}
          />
          <AuctionDetailContent
            item={'경매 일시'}
            content={generateDateToText(startedDateTime)}
          />
          <AuctionDetailContent
            item={'시작 가격'}
            content={`${initialPrice}원`}
          />
          <AuctionDetailContent
            item={'현재 예약자'}
            content={`${reservedUser.length}명`}
          />
          <AuctionDetailContent item={'상품 정보'} content={description} />
        </div>
        {onClick && (
          <Button onClick={() => onClick(auctionId)} text={'경매 예약하기'} />
        )}
      </div>
    </Wrapper>
  );
};

export default AuctionDetail;
