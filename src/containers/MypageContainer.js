import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES, TYPE } from '../constants';
import { useHistory, useLocation } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';
import NavItem from '../components/NavItem';
import ContentTable from '../components/ContentTable';
import {
  myAuctionsSelector,
  reservedAuctionsSelector,
} from '../redux/auction/auctios.selector';
import Button from '../components/Button';

const MypageContentBox = styled.div`
  display: flex;
  padding: 30px 5% 15px 20%;
  padding-right: 5%;
  min-height: 85vh;
`;

const MypageContainer = () => {
  const myAuctions = useSelector(myAuctionsSelector);
  const reservedAuctions = useSelector(reservedAuctionsSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  const handleButtonClick = (auctionId, type) => {
    switch (type) {
      case TYPE.START:
        console.log(11);
        break;
      case TYPE.MODIFY:
        console.log(22);
        break;
      case TYPE.DELETE:
        console.log(33);
        break;
      case TYPE.JOIN:
        console.log(344);
        break;
    }
  };

  return (
    <>
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
        <NavItem to={`${ROUTES.HOME}`} name={'회원 탈퇴'} color='white' />
      </SideNavBar>
      <MypageContentBox>
        {pathname === `${ROUTES.MY_PAGE}${ROUTES.MY_AUCTIONS}` && (
          <ContentTable
            auctionsInfo={myAuctions}
            title={'내가 등록한 경매'}
            onClick={handleButtonClick}
            isMyAuction={true}
          >
            <Button text='경매시작' width='100%' />
            <Button text='경매수정' width='100%' />
            <Button text='경매삭제' width='100%' />
          </ContentTable>
        )}
        {pathname === `${ROUTES.MY_PAGE}${ROUTES.RESERVED_AUCTIONS}` && (
          <ContentTable
            auctionsInfo={reservedAuctions}
            title={'내가 예약한 경매'}
            onClick={handleButtonClick}
          >
            <Button text='경매참여' width='100%' />
          </ContentTable>
        )}
      </MypageContentBox>
    </>
  );
};

export default MypageContainer;
