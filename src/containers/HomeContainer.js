import styled from 'styled-components';
import { connect } from 'react-redux';
import Carousel from '../components/Carousel';
import { Link, useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { ROUTES } from '../constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HomeContainer = ({ isLoggedIn }) => {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push(ROUTES.REGISTRATION);
  }

  return (
    <Wrapper>
      <Carousel />
      <Button onClick={handleButtonClick} text={'내 중고 상품 등록'}/>
    </Wrapper>
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

export default connect(mapStateToProps, null)(HomeContainer);
