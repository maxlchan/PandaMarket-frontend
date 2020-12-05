import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import NavItem from '../components/NavItem';
import { ROUTES } from '../constants';
import logo from '../assets/images/logoHorizontal.png';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/user/user.reducer';

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  margin-bottom: 1.5px;

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

const HeaderContainer = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <StyledHeader>
      <Link className='header__logo' to={ROUTES.HOME}>
        <img src={logo} alt='logo' />
      </Link>
      <nav className='header__nav'>
        <NavItem to={ROUTES.HOME} name={'홈'} />
        <NavItem to={ROUTES.AUCTIONS} name={'경매상품'} />
        {isLoggedIn && <NavItem to={ROUTES.MY_INFO} name={'내정보'} />}
        {isLoggedIn
          ? <NavItem to={ROUTES.HOME} name={'로그아웃'} onClick={handleLogout} />
          : <NavItem to={ROUTES.LOGIN} name={'로그인'} />
        }
      </nav>
    </StyledHeader>
  );
};

export default HeaderContainer;
