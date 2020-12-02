import { Route, Redirect } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import themes from './styles/themes';

import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';

const App = () => {
  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <HeaderContainer />
      <section>
        <Route exactpath='/' component={HomeContainer} />


      </section>
    </ThemeProvider>
  );
};

export default App;
