import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChatUnit from '../components/ChatUnit';
import ChatInput from '../components/ChatInput';
import Button from '../components/Button';
import UserIcon from '../components/UserIcon';
import themes from '../styles/themes';
import { CONFIG, MESSAGE, ROUTES } from '../constants';
import { socket } from '../utils/socket';
import {
  resetBroadcast,
  setBroadcast,
  startCountdown,
} from '../redux/broadcast/broadcast.reducer';
import {
  userRequiredInRoomSelector,
  userInfoSelector,
} from '../redux/user/user.selector';
import { broadcastSelectorForAuction } from '../redux/broadcast/broadcast.selector';

const COLORS = themes.colors;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`;

const BroadcastBox = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 90%;
  padding: 20px 30px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadows.default};

  .box__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    height: 100%;
    margin-right: 10px;

    video {
      width: 100%;
    }

    .box__left__status {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 40%;

      h2 {
        font-size: ${({ theme }) => theme.fontSizes.base};
      }
    }
  }

  .box__right {
    width: 50%;
    height: 100%;
    box-shadow: ${({ theme }) => theme.boxShadows.default};
    overflow: hidden;

    .box__right__allchat {
      width: 100%;
      height: 70%;
      background-color: ${({ theme }) => theme.colors.light_white};
      box-shadow: ${({ theme }) => theme.boxShadows.default};
      overflow: auto;
    }

    .box__right__mychat {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-end;
      position: relative;
      width: 100%;
      height: 10%;

      .box__right__usericon {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 30px;
        position: absolute;
        left: 15px;
        top: 15px;
      }
    }

    .box__right__bid {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 20%;

      .box__right__bid__price {
        font-size: ${({ theme }) => theme.fontSizes.base};
      }
    }
  }
`;

const PriceBiddingInput = styled.input`
  border: none;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const BroadcastContainer = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { myAuctions, _id } = useSelector(userInfoSelector);
  const userRequiredInRoom = useSelector(userRequiredInRoomSelector);
  const {
    memberNumber,
    highestBidPrice,
    currentWinner,
    messages,
    isCountdownStart,
    timeCount,
  } = useSelector(broadcastSelectorForAuction);
  const [bidPrice, setBidPrice] = useState('');
  const [message, setMessage] = useState('');

  const hostVideo = useRef();
  const peer = useRef({});
  const messagesEndRef = useRef();

  const dispatch = useDispatch();
  const history = useHistory();
  const { auctionId } = useParams();

  const isHost = myAuctions.includes(auctionId);

  const handleBidButtonClick = () => {
    if (Number(bidPrice) <= Number(highestBidPrice)) {
      return alert(MESSAGE.INVAILD_BIDDING);
    }

    socket.emit('update highest bid price', bidPrice);
  };

  const handleChatButtonClick = () => {
    socket.emit('send message', message);
    setMessage('');
  };

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      socket.emit('send message', message);
      setMessage('');
    }
  };

  const handleBidInputChange = (e) => {
    setBidPrice(e.target.value);
  };

  const handleCountDownClick = () => {
    dispatch(startCountdown());
    socket.emit('countdown', CONFIG.LIMITED_SECONDS);
  };

  const handleTimeout = () => {
    const isWinner = currentWinner?._id === _id;

    if (isHost) {
      alert('경매가 완료되었습니다. 낙찰자와의 대화창으로 이동합니다');
      return;
    }

    if (isWinner) {
      alert(
        '경매가 완료되었습니다. 1등으로 낙찰 되셨네요. 판매자와의 대화창으로 이동합니다'
      );
      return;
    }

    alert('경매가 완료되었습니다. 아쉽지만 다음 기회를 노리세요!');
    history.push(ROUTES.HOME);
    socket.emit('leave room');
  };

  const subscribeAsHost = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      hostVideo.current.srcObject = stream;

      socket.emit('create room', {
        roomId: auctionId,
        user: userRequiredInRoom,
      });

      socket.on('send message', (payload) => {
        dispatch(setBroadcast(payload));
      });

      socket.on('update highest bid price', (payload) => {
        dispatch(setBroadcast(payload));
      });

      socket.on('countdown', (payload) => {
        dispatch(setBroadcast(payload));
      });

      socket.on('member join room', (memberSocketId, member, payload) => {
        dispatch(setBroadcast(payload));

        peer.current[memberSocketId] = new RTCPeerConnection(CONFIG.ICE_SERVER);

        const stream = hostVideo.current.srcObject;

        stream
          .getTracks()
          .forEach((track) =>
            peer.current[memberSocketId].addTrack(track, stream)
          );

        peer.current[memberSocketId].onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('candidate', memberSocketId, {
              type: 'candidate',
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate,
            });
          }
        };

        peer.current[memberSocketId]
          .createOffer()
          .then((sessionDescription) => {
            peer.current[memberSocketId].setLocalDescription(
              sessionDescription
            );

            socket.emit('offer', memberSocketId, {
              type: 'offer',
              sdp: sessionDescription,
            });
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(`${member.name}님이 들어오셨습니다.`);
      });

      socket.on('answer', (memberSocketId, event) => {
        peer.current[memberSocketId].setRemoteDescription(
          new RTCSessionDescription(event)
        );
      });

      socket.on('candidate', (memberSocketId, event) => {
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: event.label,
          candidate: event.candidate,
        });

        peer.current[memberSocketId].addIceCandidate(candidate);
      });

      socket.on('leave room', (memberSocketId, name, payload) => {
        delete peer.current[memberSocketId];
        dispatch(setBroadcast(payload));
        console.log(`${name}이 나가셨습니다.`);
      });
    } catch (err) {
      console.log(err.name + ': ' + err.message);
    }
  };

  const subscribeAsMember = () => {
    socket.emit('join room', { roomId: auctionId, user: userRequiredInRoom });

    socket.on('member join room', (_, __, payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on('send message', (payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on('countdown', (payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on('leave room', (_, __, payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on('update highest bid price', (payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on('offer', (hostSocketId, sdp) => {
      peer.current[hostSocketId] = new RTCPeerConnection(CONFIG.ICE_SERVER);
      peer.current[hostSocketId].setRemoteDescription(sdp);
      peer.current[hostSocketId].createAnswer().then((sessionDescription) => {
        peer.current[hostSocketId].setLocalDescription(sessionDescription);

        socket.emit('answer', {
          type: 'answer',
          sdp: sessionDescription,
          roomId: auctionId,
        });
      });

      peer.current[hostSocketId].ontrack = (event) => {
        hostVideo.current.srcObject = event.streams[0];
      };

      peer.current[hostSocketId].onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', hostSocketId, {
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          });
        }
      };
    });

    socket.on('candidate', (hostSocketId, event) => {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });
      peer.current[hostSocketId].addIceCandidate(candidate);
    });

    socket.on('room broked by host', () => {
      alert('방장님이 나가셨습니다.');

      socket.emit('leave room');
      dispatch(resetBroadcast());
      history.push(ROUTES.HOME);
    });
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    if (isHost) {
      subscribeAsHost();
    } else {
      subscribeAsMember();
    }

    return () => socket.removeAllListeners();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const isTimeout = timeCount === 0;
    isTimeout && handleTimeout();
  }, [timeCount]);

  console.log(!!bidPrice);

  return (
    <Wrapper>
      <BroadcastBox>
        <div className='box__left'>
          <video autoPlay ref={hostVideo} />
          <div className='box__left__status'>
            <h2>시작가 - {3000}원</h2>
            {highestBidPrice && <h2>현재 경매가 - {highestBidPrice}원</h2>}
            {currentWinner?.name && <h3>현재 1등 {currentWinner.name}님</h3>}
          </div>
          {isCountdownStart && <span>{timeCount}</span>}
          <Button text={'제품 상세보기'} />
        </div>
        <div className='box__right'>
          <div className='box__right__allchat'>
            {messages.map(({ imageUrl, name, message, isHost }, index) => (
              <ChatUnit
                key={index}
                imageUrl={imageUrl}
                name={name}
                text={message}
                isHost={isHost}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className='box__right__mychat'>
            <ChatInput
              onKeyPress={handleKeyPress}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              disabled={!message}
            />
            <Button
              color={COLORS.indigo}
              text='전송'
              onClick={handleChatButtonClick}
            />
            <UserIcon
              className='box__right__usericon'
              userNumber={memberNumber}
            />
          </div>
          <div className='box__right__bid'>
            {isHost ? (
              <Button
                disabled={isCountdownStart}
                onClick={handleCountDownClick}
                width='80%'
                text={'카운트 다운 Start'}
              />
            ) : (
              <>
                <div className='box__right__bid__price'>
                  <span>₩</span>
                  <PriceBiddingInput
                    type='number'
                    value={bidPrice}
                    onChange={handleBidInputChange}
                    placeholder={0}
                  />
                  <span>KRW</span>
                </div>
                <Button
                  width='80%'
                  text='배팅하기'
                  onClick={handleBidButtonClick}
                  disabled={!bidPrice}
                />
              </>
            )}
          </div>
        </div>
      </BroadcastBox>
    </Wrapper>
  );
};

export default BroadcastContainer;
