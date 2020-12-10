import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import ChatInput from '../components/ChatInput';
import ChatUnit from '../components/ChatUnit';
import themes from '../styles/themes';
import UserIcon from './UserIcon';

const COLORS = themes.colors;

const ChatBoxWrapper = styled.div`
  width: 100%;
  height: 80%;
  min-height: 300px;
  max-height: 800px;
  overflow: hidden;
  position: relative;
  box-shadow: ${({ isPrivate, theme }) =>
    isPrivate && theme.boxShadows.default};
  border-radius: ${({ isPrivate }) => isPrivate && '30px'};

  .box__allchat {
    width: 100%;
    height: 85%;
    background-color: ${({ isPrivate, theme }) =>
      isPrivate ? 'rgba(200,200,200, 0.9)' : theme.colors.light_white};
    box-shadow: ${({ theme }) => theme.boxShadows.default};
    overflow-y: overlay;
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
      width: 30px;
      position: absolute;
      left: 15px;
      top: 15px;
    }
  }
`;

const ChatBoxHeader = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  background-color: white;
  width: 100%;
  height: 5vh;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadows.default};

  h1 {
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
  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <ChatBoxWrapper isPrivate={isPrivate}>
      <ChatBoxHeader>
        <h1>{isPrivate ? '대화창' : '주요 채팅'}</h1>
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
          <UserIcon className='box__usericon' userNumber={memberNumber} />
        )}
      </div>
    </ChatBoxWrapper>
  );
};

export default ChatBox;
