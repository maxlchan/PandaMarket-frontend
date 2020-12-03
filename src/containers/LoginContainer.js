import { connect } from 'react-redux';
import styled from 'styled-components';
import { loginUser } from '../actions';
import panda from '../assets/images/panda.png';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { loginWithGoogle } from '../utils/api';
import { MESSAGE } from '../constants';
import { useHistory, useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;

  .box__login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    min-width: 500px;
    height: 70%;
    background-color: ${(props) => props.theme.LIGHT_WHITE};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .text__login {
    font-size: 4rem;
    color: ${(props) => props.theme.BAMBOO};
  }

  .text__welcome {
    font-size: 1.5rem;
    margin-bottom: 50px;
  }
`;

const LoginContainer = ({ loginUser }) => {
  const history = useHistory();
  const location = useLocation();

  console.log(history);
  console.log(location);
  const handleResponse = async (authResponse) => {
    try {
      const { data } = await loginWithGoogle(authResponse);
      const { userInfo, token } = data;


      localStorage.setItem('token', token);
      loginUser(userInfo);
    } catch (err) {
      alert(MESSAGE.UNKNOWN_ERROR);
    }
  };

  return (
    <Wrapper>
      <div className='box__login'>
        <img src={panda} alt={'logo'} />
        <h1 className='text__login'>LOGIN</h1>
        <h2 className='text__welcome'>Welcome back</h2>
        <GoogleLoginButton onResponse={handleResponse} />
      </div>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userInfo) => dispatch(loginUser(userInfo)),
  };
};

export default connect(null, mapDispatchToProps)(LoginContainer);
