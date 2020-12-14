import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import ChatBox from '../components/ChatBox';
import Loading from '../components/Loading';
import { broadcastSelectorForAuction } from '../redux/broadcast/broadcast.selector';
import { userInfoSelector } from '../redux/user/user.selector';
import {
  resetBroadcast,
  setBroadcast,
} from '../redux/broadcast/broadcast.reducer';
import { socket, socketApi } from '../utils/socket';
import { ROUTES, TYPE, URL, SOCKET_EVENT} from '../constants';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 93vh;
  background-image: url(${URL.CONFETTI});
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
      font-weight: ${({ theme }) => theme.fontWeights.strong};
      color: ${({ theme }) => theme.colors.ligth_black};
    }
  }
`;

const PrivateChatContainer = () => {
  const { isLoading } = useSelector((state) => state.broadcast);
  const { privateMessages, isFinished } = useSelector(broadcastSelectorForAuction);
  const { _id: userId } = useSelector(userInfoSelector);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    socket.on(SOCKET_EVENT.CHANGE_ROOM_STATUS, (payload) => {
      dispatch(setBroadcast(payload));
    });

    return () => socket.off(SOCKET_EVENT.CHANGE_ROOM_STATUS);
  }, []);

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      socketApi.sendPrivateMessage(message);
      setMessage('');
    }
  };

  const handleChatButtonClick = () => {
    socketApi.sendPrivateMessage(message);
    setMessage('');
  };

  const handleEndButtonClick = () => {
    socketApi.leaveRoom();
    dispatch(resetBroadcast());
    history.replace(ROUTES.HOME);
  };

  return isLoading ? (
    <Loading type={TYPE.LOADING} color='white' />
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
          isPrivate={isFinished}
          userId={userId}
        />
        <Button onClick={handleEndButtonClick} text={'대화 종료하기'} />
      </div>
    </Wrapper>
  );
};

export default PrivateChatContainer;
