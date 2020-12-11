import React from 'react';
import styled from 'styled-components';

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
    vertical-align: middle;
    max-height: 150px;
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

export default AuctionDetailContent;
