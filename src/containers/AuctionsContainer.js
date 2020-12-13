import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AuctionCategory from '../components/AuctionCategory';
import AuctionDetail from '../components/AuctionDetail';
import AuctionItem from '../components/AuctionItem';
import CloseButton from '../components/CloseButton';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import Search from '../components/Search';
import { auctionsOnWaitingSelector } from '../redux/auction/auctios.selector';
import {
  fetchAuctions,
  reserveAuction,
} from '../redux/auction/auction.reducer';
import { ITEM_CATEGORY, TYPE } from '../constants';
import { checkIsKeywordIn } from '../utils';

const itemCategories = [...ITEM_CATEGORY, '전체'];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 40px;
  overflow: auto;
`;

const AuctionsGrid = styled.div`
  display: grid;
  width: 1000px;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  column-gap: 10px;
  row-gap: 20px;
  padding: 20px 0 60px 0;
`;

const AuctionCategoryBox = styled.div`
  display: flex;
  width: 1000px;
  margin: 20px 0;
`;

const AuctionsContainer = () => {
  const auctions = useSelector(auctionsOnWaitingSelector);
  const { isLoading } = useSelector((state) => state.auctions);
  const [isModalClicked, setIsModalClicked] = useState(false);
  const [clickedAuction, setClickedAuction] = useState({});
  const [isCategoryFilterOn, setIsCategoryFilterOn] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState('');
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchAuctions());
  // }, []);

  const handleAuctionSearch = (keyword) => {
    if (!keyword) {
      setIsSearchOn(false);
      return;
    }

    setIsCategoryFilterOn(false);
    setIsSearchOn(true);
    setSearchKeyWord(keyword);
  };

  const handleAuctionsDetailClick = (clickedAuctionId) => {
    const clickedAuction = auctions.find((auction) => {
      return auction._id === clickedAuctionId;
    });

    setClickedAuction(clickedAuction);
    setIsModalClicked(true);
  };

  const handleReserveButtonClick = (clickedAuctionId) => {
    dispatch(reserveAuction(clickedAuctionId));
  };

  const handleCategoryClick = (category) => {
    if (category === '전체') {
      setIsCategoryFilterOn(false);
      return;
    }

    setIsSearchOn(false);
    setIsCategoryFilterOn(true);
    setFilteredCategory(category);
  };

  const closeModal = () => setIsModalClicked(false);

  return isLoading ? (
    <Loading type={TYPE.LOADING} color='white' />
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
      <Search onSearch={handleAuctionSearch} />
      <AuctionCategoryBox>
        {itemCategories.map((category, index) => (
          <AuctionCategory
            key={category}
            title={category}
            id={category}
            index={index}
            onClick={handleCategoryClick}
          />
        ))}
      </AuctionCategoryBox>
      <AuctionsGrid>
        {auctions?.map(
          ({
            title,
            _id,
            picturesUrl,
            initialPrice,
            category,
            itemName,
            description,
          }) => {
            if (isCategoryFilterOn && category !== filteredCategory) return;
            if (isSearchOn) {
              const isValidated = checkIsKeywordIn(searchKeyWord, {
                title,
                itemName,
                description,
              });

              if (!isValidated) return;
            }

            return (
              <AuctionItem
                title={title}
                key={_id}
                imageUrl={picturesUrl}
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
