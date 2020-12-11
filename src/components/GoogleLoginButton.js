import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import googleLogo from '../assets/images/googleLogo.png';

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  background-color: white;
  padding: 10px;
  cursor: pointer;

  .login__btn__logo {
    width: 5%;
    margin-right: 10px;
  }

  .login__btn__text {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

const GoogleLoginButton = ({ onResponse }) => {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <StyledButton
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <img className='login__btn__logo' src={googleLogo} alt={googleLogo} />
          <h1 className='login__btn__text'>Login with Google</h1>
        </StyledButton>
      )}
      onSuccess={onResponse}
      onFailure={(result) => console.log(result)}
    />
  );
};

export default GoogleLoginButton;
