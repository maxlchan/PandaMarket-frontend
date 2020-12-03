import { connect } from 'react-redux';

const AuctionsContainer = ({ isLoggedIn }) => {
  return (
    <div>나는 옥션이다</div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    isLoggedIn: user.isLoggedIn,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// }

export default connect(mapStateToProps, null)(AuctionsContainer);
