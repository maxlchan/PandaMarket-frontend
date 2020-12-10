import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import ChatBox from '../components/ChatBox';
import Loading from '../components/Loading';
import { ROUTES } from '../constants';
import {
  resetBroadcast,
  setBroadcast,
} from '../redux/broadcast/broadcast.reducer';
import { broadcastSelectorForAuction } from '../redux/broadcast/broadcast.selector';
import { userInfoSelector } from '../redux/user/user.selector';
import { socket } from '../utils/socket';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 93vh;
  background-image: url('https://acegif.com/wp-content/gif/confetti-18.gif');
  background-position: center;
  background-size: cover;

  .privatechat__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 40%;
    height: 100%;

    .privatechat__title {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      color: ${({ theme }) => theme.colors.ligth_black};
      font-weight: ${({ theme }) => theme.fontWeights.strong};
    }
  }
`;

const PrivateChatContainer = () => {
  const { isLoading } = useSelector((state) => state.broadcast);
  const { privateMessages, isEnd } = useSelector(broadcastSelectorForAuction);
  const { _id: userId } = useSelector(userInfoSelector);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleEndButtonClick = () => {
    socket.emit('leave room');
    dispatch(resetBroadcast());
    history.replace(ROUTES.HOME);
  };

  return isLoading ? (
    <Loading type='spokes' color='white' />
  ) : (
    <Wrapper>
      <div className='privatechat__wrapper'>
        <div className='privatechat__title'>
          <h1>CONGRATULATIONS!</h1>
        </div>
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
    </Wrapper>
  );
};

export default PrivateChatContainer;
