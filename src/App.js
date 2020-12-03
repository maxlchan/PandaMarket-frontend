import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import AuctionsContainer from './containers/AuctionsContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import GlobalStyle from './styles/GlobalStyle';
import themes from './styles/themes';
import { ROUTES, MESSAGE } from './constants/';
import { loginUser } from './redux/user/userReducer';
import { loginWithToken } from './utils/api';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const { data } = await loginWithToken(token);
        const { userInfo } = data;

        dispatch(loginUser(userInfo));
      } catch {
        alert(MESSAGE.UNKNOWN_ERROR);
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <HeaderContainer />
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomeContainer} />
        <Route path={ROUTES.LOGIN} component={LoginContainer} />
        <Route path={ROUTES.AUCTIONS} component={AuctionsContainer} />
        <Route path={ROUTES.REGISTRATION} component={RegistrationContainer} />
        <Route render={() => <Redirect to={ROUTES.HOME} />} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
