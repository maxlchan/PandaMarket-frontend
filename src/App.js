import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import AuctionsContainer from './containers/AuctionsContainer';
import RegisterationContainer from './containers/RegisterationContainer';
import GlobalStyle from './styles/GlobalStyle';
import themes from './styles/themes';
import { ROUTES, MESSAGE } from './constants/';
import { fetchUser } from './redux/user/userReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    dispatch(fetchUser({ type: 'token', payload: token }));
  }, []);

  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <HeaderContainer />
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomeContainer} />
        <Route path={ROUTES.LOGIN} component={LoginContainer} />
        <Route path={ROUTES.AUCTIONS} component={AuctionsContainer} />
        <Route path={ROUTES.REGISTERATION} component={RegisterationContainer} />
        <Route render={() => <Redirect to={ROUTES.HOME} />} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
