import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button';
import ChatBox from '../components/ChatBox';
import { setBroadcast } from '../redux/broadcast/broadcast.reducer';
import { broadcastSelectorForAuction } from '../redux/broadcast/broadcast.selector';
import {
  userInfoSelector,
} from '../redux/user/user.selector';
import { socket } from '../utils/socket';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 93vh;
  background-color: white;

  .privatechat__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 40%;
    height: 100%;
  }

  .privatechat__backImg {
    width: 20%;
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
`;

const PrivateChatContainer = () => {
  const { privateMessages, isEnd } = useSelector(broadcastSelectorForAuction);
  const { _id: userId } = useSelector(userInfoSelector);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('send private message', (payload) => {
      dispatch(setBroadcast(payload));
    });

    return () => socket.off('send private message');
  }, []);

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      socket.emit('send private message', message);
      setMessage('');
    }
  };

  const handleChatButtonClick = () => {
    socket.emit('send private message', message);
    setMessage('');
  };

  const handleEndButtonClick = () => {};

  return (
    <Wrapper>
      <div className='privatechat__wrapper'>
        <ChatBox
          messages={privateMessages}
          message={message}
          onKeyPress={handleKeyPress}
          onChange={(e) => setMessage(e.target.value)}
          onClick={handleChatButtonClick}
          isPrivate={isEnd}
          userId={userId}
        />
        <Button onClick={handleEndButtonClick} text={'대화 종료하기'} />
      </div>
      <img

        className='privatechat__backImg'
        src={
          'https://64.media.tumblr.com/8527f7f854ea74655ed418139b3522c9/tumblr_ow9oc3MJdd1vbdodoo1_500.gif'
        }
      />
    </Wrapper>
  );
};

export default PrivateChatContainer;
