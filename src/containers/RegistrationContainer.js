import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser } from '../actions';
import { MESSAGE, ROUTES } from '../constants';
import { useEffect } from 'react';

const Wrapper = styled.div`

`;

const RegistrationContainer = ({ isLoggedIn, loginUser }) => {
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) history.push(ROUTES.LOGIN);
  }, [history, isLoggedIn]);

  return (
    <Wrapper>
      <div>상품 정보 등록 페이지입니다!</div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    isLoggedIn: user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userInfo) => dispatch(loginUser(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
