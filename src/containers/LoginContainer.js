import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser } from '../redux/user/userReducer';
import panda from '../assets/images/panda.png';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { loginWithGoogle } from '../utils/api';
import { MESSAGE } from '../constants';

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
    height: 80%;
    background-color: ${({ theme }) => theme.colors.light_white};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .text__login {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.bamboo};
  }

  .text__welcome {
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-bottom: 50px;
  }
`;

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleResponse = async (authResponse) => {
    try {
      const { data } = await loginWithGoogle(authResponse);
      const { userInfo, token } = data;

      localStorage.setItem('token', token);
      dispatch(loginUser(userInfo));

      history.goBack();
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

export default LoginContainer;
