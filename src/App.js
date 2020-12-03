import { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import AuctionsContainer from './containers/AuctionsContainer'
import GlobalStyle from './styles/GlobalStyle';
import themes from './styles/themes';
import { ROUTES, MESSAGE } from './constants/';
import { loginUser } from './actions';
import { loginWithToken } from './utils/api';

const App = ({ loginUser }) => {
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const { data } = await loginWithToken(token);
        const userInfo = data;

        loginUser(userInfo);
      } catch {
        alert(MESSAGE.UNKNOWN_ERROR);
      }
    })();
  }, [loginUser]);

  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <HeaderContainer />
      <section>
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomeContainer} />
          <Route path={ROUTES.LOGIN} component={LoginContainer} />
          <Route path={ROUTES.AUCTIONS} component={AuctionsContainer} />
          <Route render={() => <Redirect to={ROUTES.HOME} />} />
        </Switch>
      </section>
    </ThemeProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userInfo) => dispatch(loginUser(userInfo)),
  };
};

export default connect(null, mapDispatchToProps)(App);
