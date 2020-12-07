import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  word-wrap: break-word;
  word-break: keep-all;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 0;

  .chatunit__image {
    width: 5%;
    min-width: 30px;
    max-width: 50px;
    border-radius: 50px;
  }

  .chatunit__name {
    width: 5%;
    min-width: 50px;
    max-width: 70px;
    color: goldenrod;
    font-weight: ${({ theme }) => theme.fontWeights.strong};
    text-align: center;
  }

  .chatunit__text {
    width: 80%;
    min-width: 100px;
  }
`;

const ChatUnit = ({ photoUrl, name, text }) => {
  return (
    <Wrapper>
      <img className='chatunit__image' src={photoUrl} />
      <span className='chatunit__name'>{name}</span>
      <h3 className='chatunit__text'>{text}</h3>
    </Wrapper>
  );
};

export default ChatUnit;
