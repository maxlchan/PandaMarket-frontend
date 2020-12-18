import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyldBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5px;
  border-bottom: 2px solid transparent;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: white;
  word-break: break-all;
  text-align: center;
  cursor: pointer;

  &:hover {
    border-bottom: 2px solid red;

    .auction__categroy__title {
      color: red;
    }
  }

  .auction__categroy__img {
    width: 30px;
    pointer-events: none;
  }

  .auction__categroy__title {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    white-space: nowrap;
    pointer-events: none;
  }
`;

const AuctionCategory = ({ index, onClick, title }) => {
  return (
    <StyldBox onClick={(e) => onClick(e.target.id)} id={title}>
      <img
        className='auction__categroy__img'
        src={`${process.env.PUBLIC_URL}/images/category/${index}.png`}
      />
      <h1 className='auction__categroy__title'>{title}</h1>
    </StyldBox>
  );
};

AuctionCategory.propTypes = {
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuctionCategory;
