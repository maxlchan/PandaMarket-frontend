import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AuctionCategory from '../components/AuctionCategory';
import AuctionDetail from '../components/AuctionDetail';
import AuctionItem from '../components/AuctionItem';
import CloseButton from '../components/CloseButton';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import {
  fetchAuctions,
  reserveAuction,
} from '../redux/auction/auction.reducer';
import { auctionsOnWaitingSelector } from '../redux/auction/auctios.selector';
import { ITEM_CATEGORY } from '../constants';

const itemCategories = [...ITEM_CATEGORY, '전체'];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const AuctionsGrid = styled.div`
  display: grid;
  width: 1000px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  column-gap: 10px;
  row-gap: 20px;
  padding: 10px 0;
`;

const AuctionsHeader = styled.header`
  display: flex;
  width: 1000px;
  margin: 20px 0;
`;

const AuctionsContainer = () => {
  const auctions = useSelector(auctionsOnWaitingSelector);
  const { isLoading } = useSelector((state) => state.auctions);
  const [clickedAuction, setClickedAuction] = useState({});
  const [isModalClicked, setIsModalClicked] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState('');
  const dispatch = useDispatch();

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

  const handleCategoryClick = (category) => {
    if (category === '전체') return setIsFilterOn(false);

    setIsFilterOn(true);
    setFilteredCategory(category);
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
      <AuctionsHeader>
        {itemCategories.map((category, index) => (
          <AuctionCategory
            key={category}
            title={category}
            id={category}
            index={index}
            onClick={handleCategoryClick}
          />
        ))}
      </AuctionsHeader>
      <AuctionsGrid>
        {auctions.map(
          ({ picturesUrl, isStarted, initialPrice, title, _id, category }) => {
            if (isFilterOn && category !== filteredCategory) return;

            return (
              <AuctionItem
                title={title}
                key={_id}
                imageUrl={picturesUrl}
                isStarted={isStarted}
                initialPrice={initialPrice}
                onClick={() => handleAuctionsDetailClick(_id)}
              />
            );
          }
        )}
      </AuctionsGrid>
    </Wrapper>
  );
};

export default AuctionsContainer;
