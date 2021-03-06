import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import AuctionsContainer from './containers/AuctionsContainer';
import BroadcastContainer from './containers/BroadcastContainer';
import RegisterationContainer from './containers/RegisterationContainer';
import PrivateChatContainer from './containers/PrivateChatContainer';
import MypageContainer from './containers/MypageContainer';
import Loading from './components/Loading';
import GlobalStyle from './styles/GlobalStyle';
import themes from './styles/themes';
import { fetchUser } from './redux/user/user.reducer';
import { ROUTES, TYPE } from './constants/';
import { fetchAuctions } from './redux/auction/auction.reducer';

const App = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  const tokenLogin = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    dispatch(fetchUser({ type: TYPE.TOKEN, payload: token }));
  };

  useEffect(() => {
    tokenLogin();
    dispatch(fetchAuctions());
  }, []);

  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      {isLoading ? (
        <Loading type={TYPE.LOADING} color='white' />
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
            <Route
              path={`${ROUTES.AUCTIONS}${ROUTES.AUCTION_DETAIL}${ROUTES.BROADCAST}`}
            >
              <BroadcastContainer />
            </Route>
            <Route
              path={`${ROUTES.AUCTIONS}${ROUTES.AUCTION_DETAIL}${ROUTES.PRIVATE_CHAT}`}
            >
              <PrivateChatContainer />
            </Route>
            <Route path={`${ROUTES.MY_PAGE}${ROUTES.MY_AUCTIONS}`}>
              <MypageContainer />
            </Route>
            <Route path={`${ROUTES.MY_PAGE}${ROUTES.RESERVED_AUCTIONS}`}>
              <MypageContainer />
            </Route>
            <Route render={() => <Redirect to={ROUTES.HOME} />} />
          </Switch>
        </>
      )}
      <ToastContainer
        position='top-right'
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </ThemeProvider>
  );
};
export default App;
