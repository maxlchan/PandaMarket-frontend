import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ChatUnitWrapper = styled.div`
  display: flex;
  flex-direction: ${({ isChatMine }) => isChatMine && 'row-reverse'};
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  padding: 10px 0 10px 10px;
  word-wrap: break-word;
  word-break: keep-all;

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
    color: ${({ isHost }) => (isHost ? 'goldenrod' : '#253857')};
    text-align: center;
  }

  .chatunit__text {
    width: 90%;
    min-width: 100px;
    text-align: ${({ isChatMine }) => isChatMine && 'right'};
  }

  .chatunit__hostMark {
    margin-right: 5px;
    padding: 5px;
    border-radius: 50px;
    font-size: 10px;
    background-color: green;
    color: white;
  }
`;

const ChatUnit = ({ imageUrl, name, text, isHost, ownerId, userId }) => {
  const isChatMine = ownerId === userId;

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

ChatUnit.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isHost: PropTypes.bool,
  ownerId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ChatUnit;
