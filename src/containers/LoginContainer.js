import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { fetchUser } from '../redux/user/user.reducer';
import { isUserLoggedInSelector } from '../redux/user/user.selector';
import panda from '../assets/images/panda.png';
import { TYPE } from '../constants';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;

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
  const isLoggedIn = useSelector(isUserLoggedInSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleResponse = async (auth) => {
    dispatch(fetchUser({ type: TYPE.GOOGLEAUTH, payload: auth }));
  };

  useEffect(() => {
    isLoggedIn && history.goBack();
  }, []);

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
