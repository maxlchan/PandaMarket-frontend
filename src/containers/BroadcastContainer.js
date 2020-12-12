import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { CONFIG, MESSAGE, ROUTES } from '../constants';
import { socket } from '../utils/socket';
import {
  resetBroadcast,
  setBroadcast,
  startCountdown,
  setBroadcastEnd,
} from '../redux/broadcast/broadcast.reducer';
import {
  userRequiredInRoomSelector,
  userInfoSelector,
} from '../redux/user/user.selector';
import { broadcastSelectorForAuction } from '../redux/broadcast/broadcast.selector';
import ChatBox from '../components/ChatBox';
import { stopBothVideoAndAudio } from '../utils';

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
  const { myAuctions, _id: userId } = useSelector(userInfoSelector);
  const userRequiredInRoom = useSelector(userRequiredInRoomSelector);
  const [bidPrice, setBidPrice] = useState('');
  const [message, setMessage] = useState('');
  const {
    memberNumber,
    initialPrice,
    highestBidPrice,
    currentWinner,
    messages,
    isCountdownStart,
    timeCount,
  } = useSelector(broadcastSelectorForAuction);

  const hostVideo = useRef();
  const peer = useRef({});
  let stream;

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
    const isWinner = currentWinner?._id === userId;

    if (isHost) {
      alert(MESSAGE.BROADCAST_END_HOST);
    } else if (isWinner) {
      alert(MESSAGE.BROADCAST_END_WINNER);
    } else {
      dispatch(resetBroadcast());
      socket.emit('leave room');

      alert(MESSAGE.BROADCAST_END_MEMBER);
      history.replace(ROUTES.HOME);

      return;
    }

    socket.emit('broadcast end');
    dispatch(setBroadcastEnd(auctionId));
    history.replace(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.PRIVATE_CHAT}`);
  };

  const getUserMedia = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      hostVideo.current.srcObject = stream;
    } catch (err) {
      console.log(err.name + ': ' + err.message);
    }
  };

  const subscribeAsHost = async () => {
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
          peer.current[memberSocketId].setLocalDescription(sessionDescription);

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
      alert(MESSAGE.HOST_OUT);

      socket.emit('leave room');
      dispatch(resetBroadcast());
      history.push(ROUTES.HOME);
    });
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    if (isHost) {
      (async () => {
        await getUserMedia();
        subscribeAsHost();
      })();
    } else {
      subscribeAsMember();
    }

    return () => {
      socket.removeAllListeners();
      stopBothVideoAndAudio(stream);
    };
  }, []);

  useEffect(() => {
    const isTimeout = timeCount === 0;
    isTimeout && handleTimeout();
  }, [timeCount]);

  return (
    <Wrapper>
      <BroadcastBox>
        <div className='box__left'>
          <video autoPlay ref={hostVideo} />
          <div className='box__left__status'>
            <h2 className='status__intialPrice'>시작가 - {3000}원</h2>
            <h2 className='status__highestBidPrice'>
              현재 경매가 - {highestBidPrice ? highestBidPrice : initialPrice}원
            </h2>
            {currentWinner?.name && (
              <h3 className='status__currentWinner'>
                현재 1등 {currentWinner.name}님
              </h3>
            )}
          </div>
          {isCountdownStart && <span>{timeCount}</span>}
          <Button text={'제품 상세보기'} />
        </div>
        <div className='box__right'>
          <ChatBox
            messages={messages}
            message={message}
            onKeyPress={handleKeyPress}
            onChange={(e) => setMessage(e.target.value)}
            onClick={handleChatButtonClick}
            memberNumber={memberNumber}
            userId={userId}
          />
          <div className='box__right__bid'>
            {isHost ? (
              <Button
                disabled={isCountdownStart}
                onClick={handleCountDownClick}
                width='90%'
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
                  width='90%'
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
