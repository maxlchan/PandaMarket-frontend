import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import AuctionsContainer from './containers/AuctionsContainer';
import BroadcastContainer from './containers/BroadcastContainer';
import RegisterationContainer from './containers/RegisterationContainer';
import Loading from './components/Loading';
import GlobalStyle from './styles/GlobalStyle';
import themes from './styles/themes';
import { ROUTES } from './constants/';
import { fetchUser } from './redux/user/user.reducer';
import PrivateChatContainer from './containers/PrivateChatContainer';

const App = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    dispatch(fetchUser({ type: 'token', payload: token }));
  }, []);

  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      {isLoading ? (
        <Loading type='spokes' color='white' />
      ) : (
        <>
          <HeaderContainer />
          <Switch>
            <Route exact path={ROUTES.HOME}>
              <HomeContainer />
            </Route>
            <Route exact path={ROUTES.AUCTIONS}>
              <AuctionsContainer />
            </Route>
            <Route path={ROUTES.LOGIN}>
              <LoginContainer />
            </Route>
            <Route path={ROUTES.REGISTERATION}>
              <RegisterationContainer />
            </Route>
            <Route exact path={`${ROUTES.AUCTIONS}${ROUTES.AUCTION_DETAIL}${ROUTES.BROADCAST}`}>
              <BroadcastContainer />
            </Route>
            <Route path={`${ROUTES.AUCTIONS}${ROUTES.AUCTION_DETAIL}${ROUTES.PRIVATE_CHAT}`}>
              <PrivateChatContainer />
            </Route>
            <Route render={() => <Redirect to={ROUTES.HOME} />} />
          </Switch>
        </>
      )}
    </ThemeProvider>
  );
};

export default App;
