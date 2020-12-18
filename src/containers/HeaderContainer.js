import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import NavItem from '../components/NavItem';
import { logoutUser } from '../redux/user/user.reducer';
import { isUserLoggedInSelector } from '../redux/user/user.selector';
import { ROUTES } from '../constants';
import logo from '../assets/images/logoHorizontal.png';

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 7vh;
  z-index: 10;
  margin-bottom: 1.5px;
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  background-color: white;

  .header__logo {
    position: absolute;
    width: 30%;
    max-width: 200px;
    min-width: 150px;
    left: 5%;

    img {
      width: 100%;
    }
  }

  .header__nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    height: 100%;
  }
`;

const HeaderSpace = styled.div`
  height: 7vh;
`;

const HeaderContainer = () => {
  const isLoggedIn = useSelector(isUserLoggedInSelector);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
  };

  return (
    <>
      <StyledHeader>
        <Link className='header__logo' to={ROUTES.HOME}>
          <img src={logo} alt='logo' />
        </Link>
        <nav className='header__nav'>
          <NavItem to={ROUTES.HOME} name={'홈'} />
          <NavItem to={ROUTES.AUCTIONS} name={'경매상품'} />
          {isLoggedIn && (
            <NavItem
              to={`${ROUTES.MY_PAGE}${ROUTES.MY_AUCTIONS}`}
              name={'내정보'}
            />
          )}
          {isLoggedIn ? (
            <NavItem
              to={ROUTES.HOME}
              name={'로그아웃'}
              onClick={handleLogout}
            />
          ) : (
            <NavItem to={ROUTES.LOGIN} name={'로그인'} />
          )}
        </nav>
      </StyledHeader>
      <HeaderSpace />
    </>
  );
};

export default HeaderContainer;
