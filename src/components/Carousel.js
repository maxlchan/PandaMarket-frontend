import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import Card from './Card';
import themes from '../styles/themes';
import bamboo from '../assets/images/bamboo.jpg';
import WelcomeContent from './WelcomeContent';

const { colors } = themes;
const SliderWrapper = styled.div`
  width: 100%;
  height: 75vh;
`;

const Carousel = () => {
  const settings = {
    pauseOnHover: true,
    dots: true,
    infinite: true,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        <Card color={colors.light_white}>
          <WelcomeContent />
        </Card>
        <Card color={colors.pastel_blue}/>
        <Card color={colors.pastel_lavender}/>
        <Card color={colors.pastel_pink}/>
        <Card color={colors.pastel_red}/>
      </Slider>
    </SliderWrapper>
  );
};
export default Carousel;
