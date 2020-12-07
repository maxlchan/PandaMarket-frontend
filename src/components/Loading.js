import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: white;

  img {
    width: 60%;
    min-width: 800px;
    height: 75%;
  }

  .loader {
    position: fixed;
  }
`;

const Loading = ({ type, color }) => (
  <LoadingWrapper>
    <img src='https://acegif.com/wp-content/gif/panda-80.gif' />
    <ReactLoading
      className='loader'
      type={type}
      color={color}
      height={'3%'}
      width={'3%'}
    />
  </LoadingWrapper>
);

export default Loading;
