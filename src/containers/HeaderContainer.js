import styled from 'styled-components';
import { connect } from 'react-redux';
import NavItem from '../components/NavItem';
import { ROUTES } from '../constants';
import logo from '../assets/images/logoHorizontal.png';

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 60px;
  height: 60px;
  background-color: ${(props) => props.theme.LIGHT_WHITE};

  .header__logo {
    position: absolute;
    width: 12%;
    min-width: 150px;
    left: 5%;
  }

  .header__nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    height: 100%;
    background-color: yellow;
  }
`;

const HeaderContainer = ({ isLoggedIn }) => {
  return (
    <StyledHeader>
      <img class='header__logo' src={logo} alt='logo' />
      <nav class='header__nav'>
        <NavItem to={ROUTES.HOME} name={'홈'} />
        <NavItem to={ROUTES.AUCTIONS} name={'경매상품'} />
        {isLoggedIn
          ? <NavItem to={ROUTES.MY_INFO} name={'내정보'} />
          : <NavItem to={ROUTES.LOGIN} name={'로그인'} />
        }
      </nav>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    isLoggedIn: user.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(HeaderContainer);
