import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { URL } from '../constants';

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
    max-width: 1000px;
    height: 75%;
  }

  .loader {
    position: fixed;
  }
`;

const Loading = ({ type, color }) => (
  <LoadingWrapper>
    <img src={URL.LOADING} />
    <ReactLoading
      className='loader'
      type={type}
      color={color}
      height={'3%'}
      width={'3%'}
    />
  </LoadingWrapper>
);

Loading.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Loading;
