import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SideNavBar from '../components/SideNavBar';
import NavItem from '../components/NavItem';
import ContentTable from '../components/ContentTable';
import Button from '../components/Button';
import Modal from '../components/Modal';
import CloseButton from '../components/CloseButton';
import AuctionDetail from '../components/AuctionDetail';
import {
  auctionsSelector,
  myAuctionsSelector,
  reservedAuctionsSelector,
} from '../redux/auction/auctios.selector';
import { ROUTES, TYPE } from '../constants';

const MypageContentBox = styled.div`
  display: flex;
  min-height: 85vh;
  padding: 30px 5% 15px 20%;
  padding-right: 5%;
`;

const MypageContainer = () => {
  const allAuctions = useSelector(auctionsSelector);
  const myAuctions = useSelector(myAuctionsSelector);
  const reservedAuctions = useSelector(reservedAuctionsSelector);
  const [isModalClicked, setIsModalClicked] = useState(false);
  const [clickedAuction, setClickedAuction] = useState({});
  const { pathname } = useLocation();
  const history = useHistory();

  const handleButtonClick = (auctionId, type) => {
    if (type == TYPE.START) {
      history.push(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.BROADCAST}`);
    } else if (type === TYPE.JOIN) {
      history.push(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.BROADCAST}`);
    } else if (type === TYPE.MYAUCTION_DEATAIL) {
      const clickedAuction = allAuctions.find((auction) => {
        return auction._id === auctionId;
      });

      setClickedAuction(clickedAuction);
      setIsModalClicked(true);
    } else if (type === TYPE.RESERVED_DETAIL) {
      const clickedAuction = reservedAuctions.find((reservedAuction) => {
        return reservedAuction._id === auctionId;
      });

      setClickedAuction(clickedAuction);
      setIsModalClicked(true);
    }
  };

  const closeModal = () => setIsModalClicked(false);

  return (
    <>
      {isModalClicked && (
        <Modal onClick={closeModal}>
          <CloseButton onClick={closeModal} />
          <AuctionDetail auction={clickedAuction} />
        </Modal>
      )}
      <SideNavBar>
        <NavItem
          to={`${ROUTES.MY_PAGE}${ROUTES.MY_AUCTIONS}`}
          name={'내가 등록한 경매'}
          color='white'
        />
        <NavItem
          to={`${ROUTES.MY_PAGE}${ROUTES.RESERVED_AUCTIONS}`}
          name={'내가 예약한 경매'}
          color='white'
        />
      </SideNavBar>
      <MypageContentBox>
        {pathname === `${ROUTES.MY_PAGE}${ROUTES.MY_AUCTIONS}` && (
          <ContentTable
            auctionsInfo={myAuctions}
            title={'내가 등록한 경매'}
            onClick={handleButtonClick}
            isMyAuction={true}
          >
            <Button
              type={TYPE.START}
              text={'시작하기'}
              width='100%'
              padding='5px'
            />
            <Button
              type={TYPE.MYAUCTION_DEATAIL}
              text={'상세보기'}
              width='100%'
              padding='5px'
            />
          </ContentTable>
        )}
        {pathname === `${ROUTES.MY_PAGE}${ROUTES.RESERVED_AUCTIONS}` && (
          <ContentTable
            auctionsInfo={reservedAuctions}
            title={'내가 예약한 경매'}
            onClick={handleButtonClick}
          >
            <Button
              type={TYPE.JOIN}
              text={'참여하기'}
              width='100%'
              padding='5px'
            />
            <Button
              type={TYPE.RESERVED_DETAIL}
              text={'상세보기'}
              width='100%'
              padding='5px'
            />
          </ContentTable>
        )}
      </MypageContentBox>
    </>
  );
};

export default MypageContainer;
