import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 70vh;
  background-image: url(${({ backgroundImg }) => backgroundImg});
  background-position: center;
  background-size: cover;
  background-color: ${({ color }) => color};
`;

const Card = ({ color, backgroundImg, children }) => {
  return (
    <Wrapper color={color} backgroundImg={backgroundImg}>
      {children}
    </Wrapper>
  );
};

Card.propTypes = {
  color: PropTypes.string,
  backgroundImg: PropTypes.string,
  children: PropTypes.element,
};

export default Card;
