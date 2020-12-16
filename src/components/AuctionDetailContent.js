import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DetailContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 2% 0;

  .detail__content__title {
    width: 30%;
    padding-left: 30px;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  .detail__content__payload {
    width: 70%;
    max-height: 150px;
    overflow: auto;
    word-break: break-all;
  }
`;

const AuctionDetailContent = ({ item, content }) => {
  return (
    <DetailContent>
      <div className='detail__content__title'>
        <span>· {item}</span>
      </div>
      <div className='detail__content__payload'>
        <span>{content}</span>
      </div>
    </DetailContent>
  );
};

AuctionDetailContent.propTypes = {
  item: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default AuctionDetailContent;
