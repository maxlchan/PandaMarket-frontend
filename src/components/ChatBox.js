import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../components/Button';
import ChatInput from '../components/ChatInput';
import ChatUnit from '../components/ChatUnit';
import useScrollToBottom from '../hooks/useScrollToBottom';
import themes from '../styles/themes';
import UserNumberIcon from './UserNumberIcon';

const COLORS = themes.colors;

const ChatBoxWrapper = styled.div`
  width: 100%;
  height: 80%;
  max-height: 800px;
  min-height: 300px;
  overflow: hidden;
  position: relative;
  border-radius: 30px;
  box-shadow: ${({ isPrivate, theme }) => {
    return isPrivate && theme.boxShadows.default;
  }};

  .box__allchat {
    width: 100%;
    height: 85%;
    background-color: ${({ isPrivate, theme }) => {
      return isPrivate
        ? theme.colors.transparent_gray
        : theme.colors.light_white;
    }};
    box-shadow: ${({ theme }) => theme.boxShadows.default};
    overflow-y: overlay;
    z-index: 10;
  }

  .box__layer {
    height: 5vh;
  }

  .box__mychat {
    display: flex;
    justify-content: space-evenly;
    align-items: ${({ isPrivate }) => (isPrivate ? 'center' : 'flex-end')};
    position: relative;
    width: 100%;
    height: 15%;
    background-color: white;

    .box__usericon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      width: 30px;
      left: 15px;
      top: 15px;

      span {
        position: absolute;
        top: 0.1px;
        left: 20px;
      }
    }
  }
`;

const ChatBoxHeader = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 5vh;
  box-shadow: ${({ theme }) => theme.boxShadows.default};
  background-color: white;

  .box__title {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    margin-left: 30px;
  }
`;

const ChatBox = ({
  message,
  messages,
  onKeyPress,
  onClick,
  onChange,
  memberNumber,
  userId,
  isPrivate,
}) => {
  const messagesEndRef = useScrollToBottom(messages);

  return (
    <ChatBoxWrapper isPrivate={isPrivate}>
      <ChatBoxHeader>
        <h1 className='box__title'>{isPrivate ? '대화창' : 'Q&A'}</h1>
      </ChatBoxHeader>
      <div className='box__allchat'>
        <div className='box__layer' />
        {messages?.map(
          ({ imageUrl, name, message, isHost, ownerId }, index) => (
            <ChatUnit
              key={index}
              imageUrl={imageUrl}
              name={name}
              text={message}
              isHost={isHost}
              ownerId={ownerId}
              userId={userId}
            />
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className='box__mychat'>
        <ChatInput
          onKeyPress={onKeyPress}
          onChange={onChange}
          value={message}
          disabled={!message}
        />
        <Button color={COLORS.indigo} text='전송' onClick={onClick} />
        {!isPrivate && (
          <UserNumberIcon className='box__usericon' userNumber={memberNumber} />
        )}
      </div>
    </ChatBoxWrapper>
  );
};

ChatBox.propTypes = {
  message: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      isHost: PropTypes.bool.isRequired,
      ownerId: PropTypes.string.isRequired,
    })
  ),
  onKeyPress: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  memberNumber: PropTypes.number,
  userId: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool,
};

export default ChatBox;
