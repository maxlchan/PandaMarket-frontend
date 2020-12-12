import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../constants';
import { Link } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';
import NavItem from '../components/NavItem';

const MypageContentBox = styled.div`
  display: flex;
  padding: 30px 5% 15px 20%;
  padding-right: 5%;
  min-height: 85vh;

`;

const MypageContent = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  padding: 50px;

  .mypage__content__title {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    padding-bottom: 20px;
    border-bottom: 3px solid gray;
  }

  .mypage__contents {
    padding: 10px;

    .mypage__contents__list {
      padding: 30px;
      margin: 10px 0;
      border-bottom: 1px dotted gray;
    }
  }
`;


const MypageContainer = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
        <MypageContent>
          <div className='mypage__content__title'>내가 등록한 경매</div>
          <div className='mypage__contents'>
            <ul>
              <li className='mypage__contents__list'>1</li>
              <li className='mypage__contents__list'>1</li>
              <li className='mypage__contents__list'>1</li>
              <li className='mypage__contents__list'>1</li>
              <li className='mypage__contents__list'>4</li>
              <li className='mypage__contents__list'>5</li>
            </ul>
          </div>
        </MypageContent>
      </MypageContentBox>
    </>
  );
};

export default MypageContainer;
