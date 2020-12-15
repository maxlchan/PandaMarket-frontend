import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import Card from './Card';
import WelcomeContent from './WelcomeContent';
import Button from './Button';
import themes from '../styles/themes';
import bamboo from '../assets/images/bamboo.jpg';
import Bullet from './Bullet';

const { colors, pastelColors } = themes;
const cardColors = Object.values(pastelColors);

const sliderSettings = {
  dots: true,
  infinite: true,
  lazyLoad: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 1000px;
  min-height: 80vh;

  .slick-slider {
    box-shadow: ${({ theme }) => theme.boxShadows.default};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;

  .carousel__intro {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    color: white;

    .carousel__intro__title {
      position: relative;
      margin-bottom: 20px;
      font-size: ${({ theme }) => theme.fontSizes.titleSize};
      font-weight: ${({ theme }) => theme.fontWeights.strong};
      text-align: center;
      word-break: keep-all;
    }

    .carousel__intro__desrciption {
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      text-align: center;
      word-break: keep-all;

      span {
        font-size: ${({ theme }) => theme.fontSizes.xxxl};
        font-weight: ${({ theme }) => theme.fontWeights.strong};
        text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
        color: black;
      }
    }

    .carousel__intro__description__sub {
      margin-bottom: 50px;
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  }

  .carousel__image__wrap {
    width: 50%;

    img {
      max-width: 500px;
      min-height: 300px;
      max-height: 400px;
      margin: 0 auto;
      box-shadow: ${({ theme }) => theme.boxShadows.deep};
      border-radius: 10px;
    }
  }
`;

const Carousel = ({ contents, onClick }) => {
  return (
    <SliderWrapper>
      <Slider {...sliderSettings}>
        <Card backgroundImg={bamboo}>
          <WelcomeContent />
        </Card>
        {contents?.map((content, index) => {
          const { _id, picturesUrl, itemName, initialPrice } = content;
          const colorIndex = index % cardColors.length;

          return (
            <Card key={_id} color={cardColors[colorIndex]}>
              <ContentWrapper>
                <div className='carousel__intro'>
                  <Bullet text={'HOT'} />
                  <h1 className='carousel__intro__title'>{itemName}</h1>
                  <h2 className='carousel__intro__desrciption'>
                    경매 시작가 <span>{initialPrice}</span>원
                  </h2>
                  <h3 className='carousel__intro__description__sub'>
                    절찬리 경매중
                  </h3>
                  <Button
                    color={colors.indigo}
                    text={'바로 참여하기'}
                    onClick={() => onClick(_id)}
                  />
                </div>
                <div className='carousel__image__wrap'>
                  <img src={picturesUrl[0]} />
                </div>
              </ContentWrapper>
            </Card>
          );
        })}
      </Slider>
    </SliderWrapper>
  );
};
export default Carousel;
