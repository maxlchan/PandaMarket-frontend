import styled from 'styled-components';
import { connect } from 'react-redux';
import Carousel from '../components/Carousel';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const HomeContainer = ({ isLoggedIn }) => {
  return (
    <Wrapper>
      <Carousel />
      <div>나는 홈이다</div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

export default connect(mapStateToProps, null)(HomeContainer);
