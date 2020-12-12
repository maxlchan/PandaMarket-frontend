import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import Card from './Card';
import themes from '../styles/themes';
import bamboo from '../assets/images/bamboo.jpg';
import WelcomeContent from './WelcomeContent';
import Button from './Button';

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
  width: 100%;
  height: 80vh;
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
    color: white;
    white-space: nowrap;
    text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);

    .carousel__intro__title {
      font-size: ${({ theme }) => theme.fontSizes.titleSize};
      font-weight: ${({ theme }) => theme.fontWeights.strong};
      margin-bottom: 30px;
    }

    .carousel__intro__desrciption {
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      font-weight: ${({ theme }) => theme.fontWeights.medium};

      span {
        font-size: ${({ theme }) => theme.fontSizes.xxxl};
        font-weight: ${({ theme }) => theme.fontWeights.strong};
        color: ${({ theme }) => theme.colors.gray};
        text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);
      }
    }

    .carousel__intro__description__sub {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      margin-bottom: 50px;
    }
  }

  .carousel__image__wrap {
    width: 50%;

    img {
      max-width: 500px;
      min-height: 300px;
      max-height: 400px;
      margin: 0 auto;
      box-shadow: ${({ theme }) => theme.boxShadows.default};
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
        {contents.map((content, index) => {
          const { _id, picturesUrl, title, initialPrice } = content;
          const colorIndex = index % cardColors.length;

          return (
            <Card key={_id} color={cardColors[colorIndex]}>
              <ContentWrapper>
                <div className='carousel__intro'>
                  <h1 className='carousel__intro__title'>{title}</h1>
                  <h2 className='carousel__intro__desrciption'>
                    경매 시작가 <span>{initialPrice}</span>원
                  </h2>
                  <h3 className='carousel__intro__description__sub'>
                    절찬리 경매중
                  </h3>
                  <Button
                    color={colors.indigo}
                    text={'바로 참여하기'}
                    onClick={onClick}
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
