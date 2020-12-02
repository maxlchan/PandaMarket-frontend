import { connect } from "react-redux";
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import themes from '../styles/themes';

const StyledDiv = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.LAVENDER};
`

const AppContainer = () => {
  return (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
        <StyledDiv>
          asdasdssad
        </StyledDiv>
    </ThemeProvider>
  );
}

export default connect(null, null)(AppContainer);
