import { Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import themes from './styles/themes';

import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import { ROUTES } from './constants/';

const App = () => {
  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <HeaderContainer />
      <section>
        <Route exact path={ROUTES.HOME} component={HomeContainer} />
        <Route path={ROUTES.LOGIN} component={LoginContainer} />
        <Redirect to={ROUTES.HOME} />
      </section>
    </ThemeProvider>
  );
};

export default App;
