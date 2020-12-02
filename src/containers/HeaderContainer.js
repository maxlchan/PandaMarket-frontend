import styled from 'styled-components';
import { connect } from 'react-redux';
import NavItem from '../components/NavItem';
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
    width: 15%;
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
        <NavItem name={'홈'} />
        <NavItem name={'경매상품'} />
        {isLoggedIn ? <NavItem name={'내정보'} /> : <NavItem name={'로그인'} />}
      </nav>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user,
  };
};

export default connect(mapStateToProps, null)(HeaderContainer);
