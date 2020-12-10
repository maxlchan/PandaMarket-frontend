import React from 'react';
import styled from 'styled-components';

const ChatUnitWrapper = styled.div`
  display: flex;
  flex-direction: ${({ isChatMine }) => isChatMine && 'row-reverse'};
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  word-wrap: break-word;
  word-break: keep-all;
  padding: 10px 0 10px 10px;

  .chatunit__image {
    width: 3%;
    min-width: 30px;
    max-width: 50px;
    border-radius: 50px;
  }

  .chatunit__name {
    width: 3%;
    min-width: 50px;
    max-width: 70px;
    color: ${({ isHost }) => (isHost ? 'goldenrod' : 'black')};
    font-weight: ${({ theme }) => theme.fontWeights.strong};
    text-align: center;
  }

  .chatunit__text {
    text-align: ${({ isChatMine }) => isChatMine && 'right'};
    width: 90%;
    min-width: 100px;
  }

  .chatunit__hostMark {
    padding: 5px;
    background-color: green;
    border-radius: 50px;
    color: white;
    font-size: 10px;
    margin-right: 5px;
  }
`;

const ChatUnit = ({ imageUrl, name, text, isHost, ownerId, userId }) => {
  const isChatMine = ownerId == userId;

  return (
    <ChatUnitWrapper isChatMine={isChatMine} isHost={isHost}>
      <img className='chatunit__image' src={imageUrl} />
      <span className='chatunit__name'>{name}</span>
      {isHost && !isChatMine && (
        <span className='chatunit__hostMark'>판매자</span>
      )}
      <span className='chatunit__text'>{text}</span>
    </ChatUnitWrapper>
  );
};

export default ChatUnit;
