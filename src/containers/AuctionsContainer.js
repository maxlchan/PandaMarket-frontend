import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuctionDetail from '../components/AuctionDetail';
import AuctionItem from '../components/AuctionItem';
import CloseButton from '../components/CloseButton';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import { fetchAuctions, reserveAuction } from '../redux/auction/auction.reducer';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AuctionsGrid = styled.div`
  display: grid;
  width: 50%;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  column-gap: 10px;
  row-gap: 20px;
`;

const AuctionsContainer = () => {
  const auctions = useSelector((state) => state.auctions.data);
  const { isLoading } = useSelector((state) => state.auctions);
  const [isModalClicked, setIsModalClicked] = useState(false);
  const [clickedAuction, setClickedAuction] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAuctions());
  }, []);

  const handleAuctionsDetailClick = (clickedAuctionId) => {
    const clickedAuction = auctions.find(
      (auction) => auction._id === clickedAuctionId
    );

    setClickedAuction(clickedAuction);
    setIsModalClicked(true);
  };

  const handleReserveButtonClick = (clickedAuctionId) => {
    dispatch(reserveAuction(clickedAuctionId));
  };

  const closeModal = () => setIsModalClicked(false);

  return isLoading ? (
    <Loading type='spokes' color='white' />
  ) : (
    <Wrapper>
      {isModalClicked && (
        <Modal onClick={closeModal}>
          <CloseButton onClick={closeModal} />
          <AuctionDetail
            auction={clickedAuction}
            onClick={handleReserveButtonClick}
          />
        </Modal>
      )}
      <AuctionsGrid>
        {auctions.map(
          ({ picturesUrl, isStarted, initialPrice, title, _id }) => (
            <AuctionItem
              title={title}
              key={_id}
              imageUrl={picturesUrl}
              isStarted={isStarted}
              initialPrice={initialPrice}
              onClick={() => handleAuctionsDetailClick(_id)}
            />
          )
        )}
      </AuctionsGrid>
    </Wrapper>
  );
};

export default AuctionsContainer;
