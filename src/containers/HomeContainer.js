import styled from 'styled-components';
import { connect } from 'react-redux';

const HomeContainer = ({ isLoggedIn }) => {
  return (
    <div>나는 홈이다</div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

export default connect(mapStateToProps, null)(HomeContainer);
