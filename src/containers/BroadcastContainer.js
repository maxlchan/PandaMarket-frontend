import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReactAudioPlayer from 'react-audio-player';
import AuctionDetail from '../components/AuctionDetail';
import ChatBox from '../components/ChatBox';
import Modal from '../components/Modal';
import CloseButton from '../components/CloseButton';
import Button from '../components/Button';
import Timer from '../components/Timer';
import {
  userRequiredInRoomSelector,
  userInfoSelector,
} from '../redux/user/user.selector';
import { broadcastSelectorForAuction } from '../redux/broadcast/broadcast.selector';
import {
  resetBroadcast,
  setBroadcast,
  finishBroadcast,
  startBroadcast,
} from '../redux/broadcast/broadcast.reducer';
import { checkIsBigger, stopBothVideoAndAudio, unitizedValue } from '../utils';
import { socket, socketApi } from '../utils/socket';
import { alertSuccess, alertError, alertWarn } from '../config/customizedSwal';
import { CONFIG, MESSAGE, ROUTES, SOCKET_EVENT, URL } from '../constants';
import countdownSound from '../assets/sounds/countdownSound.ogg';
import tickSound from '../assets/sounds/tickSound.ogg';
import cashSound from '../assets/sounds/cashSound.ogg';
import twinkleSound from '../assets/sounds/twinkleSound.ogg';
import backgroundSound from '../assets/sounds/backgroundSound.ogg';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 93vh;
  background-image: url(${URL.BROADCAST_BACKGROUND});
  background-size: cover;
  background-position: center;
`;

const BroadcastBox = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 90%;
  height: 90%;
  padding: 20px 30px;

  .box__left {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 60%;
    height: 100%;
    margin-right: 10px;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.15);

    .box__left__video {
      display: flex;
      justify-content: center;
      width: 100%;

      video {
        width: 90%;
        border-radius: 10px;
        box-shadow: ${({ theme }) => theme.boxShadows.deep};
      }
    }

    .box__left__img {
      width: 20%;
      position: fixed;
      left: 5%;
      top: 8%;
      z-index: 10;

      img {
        width: 40%;
      }
    }

    .box__left__status {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      position: relative;
      width: 100%;
      height: 40%;

      h2 {
        font-size: ${({ theme }) => theme.fontSizes.base};
      }

      .status__highestBidPrice {
        span {
          font-size: ${({ theme }) => theme.fontSizes.lg};
          font-weight: ${({ theme }) => theme.fontWeights.strong};
        }
      }
    }
  }

  .box__right {
    width: 50%;
    height: 100%;
    box-shadow: ${({ theme }) => theme.boxShadows.deep};
    background-color: white;
    overflow: hidden;
    border-radius: 30px;

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

const TimeCountWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 45%;
  left: 50%;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: ${({ theme }) => theme.fontWeights.strong};
  transform: translate(-50%, -50%);
  user-select: none;
`;

const PriceBiddingInput = styled.input`
  border: none;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const BroadcastContainer = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const auctions = useSelector((state) => state.auctions.data);
  const { myAuctions, _id: userId } = useSelector(userInfoSelector);
  const userRequiredInRoom = useSelector(userRequiredInRoomSelector);
  const {
    highestBidPrice,
    currentWinner,
    memberNumber,
    messages,
    isCountdownStart,
    timeCount,
  } = useSelector(broadcastSelectorForAuction);
  const [currentAuction, setCurrentAuction] = useState({});
  const [bidPrice, setBidPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [isModalClicked, setIsModalClicked] = useState(false);
  const [isCountButtonDisabld, setIsCountButtonDisabld] = useState(false);
  const [isUserBidding, setIsUserBidding] = useState(false);
  const initialPrice = currentAuction?.initialPrice;

  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const hostVideo = useRef();
  const peer = useRef({});
  let stream;

  const handleBidButtonClick = async () => {
    if (highestBidPrice) {
      const isLowerThanHightest = !checkIsBigger(bidPrice, highestBidPrice);
      if (isLowerThanHightest) {
        alertError(MESSAGE.LOWER_THAN_HIGHTEST);
        return;
      }
    } else {
      const isLowerThanInitial = !checkIsBigger(bidPrice, initialPrice);
      if (isLowerThanInitial) {
        alertError(MESSAGE.LOWER_THAN_INITIAL);
        return;
      }
    }

    socketApi.updateHighestBid(bidPrice);
  };

  const handleChatButtonClick = () => {
    if (!message) return;

    socketApi.sendMessage(message);
    setMessage('');
  };

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      socketApi.sendMessage(message);
      setMessage('');
    }
  };

  const handleCountDownClick = () => {
    setIsCountButtonDisabld(true);
    socketApi.countdown(CONFIG.LIMITED_SECONDS);
  };

  const handleTimeout = async () => {
    const isWinner = currentWinner._id === userId;

    if (isHost) {
      await alertSuccess(MESSAGE.BROADCAST_END_HOST);
    } else if (isWinner) {
      await alertSuccess(MESSAGE.BROADCAST_END_WINNER);
    } else {
      dispatch(resetBroadcast());
      socketApi.leaveRoom();
      await alertSuccess(MESSAGE.BROADCAST_END_MEMBER);
      history.replace(ROUTES.HOME);

      return;
    }

    dispatch(finishBroadcast(auctionId));
    socketApi.finishBroadcast();
    history.replace(`${ROUTES.AUCTIONS}/${auctionId}${ROUTES.PRIVATE_CHAT}`);
  };

  const handleBidPriceChange = (value) => {
    if (value === '') return setBidPrice(value);

    const unitizedNumber = unitizedValue(value);
    if (!unitizedNumber) return;

    setBidPrice(unitizedNumber);
  };

  const handleOnTrack = (event) => {
    hostVideo.current.srcObject = event.streams[0];
  };

  const handleOnIceCandidate = (socketId) => {
    return ({ candidate }) => {
      if (candidate) {
        socketApi.candidate(socketId, {
          type: 'candidate',
          label: candidate.sdpMLineIndex,
          id: candidate.sdpMid,
          candidate: candidate.candidate,
        });
      } else {
        candidate == null;
      }
    };
  };

  const closeModal = () => setIsModalClicked(false);

  const getUserMedia = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      hostVideo.current.srcObject = stream;
    } catch (err) {
      throw new Error(err);
    }
  };

  const subscribeAsHost = async () => {
    socketApi.createRoom({
      roomId: auctionId,
      user: userRequiredInRoom,
    });

    socket.on(
      SOCKET_EVENT.MEMBER_JOIN_ROOM,
      async (memberSocketId, payload) => {
        dispatch(setBroadcast(payload));

        peer.current[memberSocketId] = new RTCPeerConnection(CONFIG.ICE_SERVER);

        const currentPeer = peer.current[memberSocketId];

        stream = hostVideo.current.srcObject;
        stream
          .getTracks()
          .forEach((track) => currentPeer.addTrack(track, stream));

        currentPeer.onicecandidate = handleOnIceCandidate(memberSocketId);

        try {
          const sessionDescription = await currentPeer.createOffer();

          currentPeer.setLocalDescription(sessionDescription);
          socketApi.offer(memberSocketId, {
            type: 'offer',
            sdp: sessionDescription,
          });
        } catch (err) {
          throw new Error(err);
        }
      }
    );

    socket.on(SOCKET_EVENT.UPDATE_HIGHEST_BID_PRICE, ({ name, price }) => {
      setIsCountButtonDisabld(false);
      setIsUserBidding(true);
      setTimeout(() => setIsUserBidding(false), 2000);
      toast.info(`💰 ${name}님 ₩${price}원 배팅!`, CONFIG.TOASTIFY);
    });

    socket.on(SOCKET_EVENT.CHANGE_ROOM_STATUS, (payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on(SOCKET_EVENT.LEAVE_ROOM, (memberSocketId, payload) => {
      delete peer.current[memberSocketId];
      dispatch(setBroadcast(payload));
    });

    socket.on(SOCKET_EVENT.ANSWER, (memberSocketId, event) => {
      const currentPeer = peer.current[memberSocketId];
      currentPeer.setRemoteDescription(new RTCSessionDescription(event));
    });

    socket.on(SOCKET_EVENT.CANDIDATE, (memberSocketId, event) => {
      const currentPeer = peer.current[memberSocketId];
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });

      currentPeer.addIceCandidate(candidate);
    });
  };

  const subscribeAsMember = () => {
    socketApi.joinRoom({ roomId: auctionId, user: userRequiredInRoom });

    socket.on(SOCKET_EVENT.MEMBER_JOIN_ROOM, (_, payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on(SOCKET_EVENT.CHANGE_ROOM_STATUS, (payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on(SOCKET_EVENT.LEAVE_ROOM, (_, payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on(SOCKET_EVENT.UPDATE_HIGHEST_BID_PRICE, ({ name, price }) => {
      setIsUserBidding(true);
      setTimeout(() => setIsUserBidding(false), 2000);
      toast.info(`💰 ${name}님 ₩${price}원 배팅!💰`, CONFIG.TOASTIFY);
    });

    socket.on(SOCKET_EVENT.OFFER, async (hostSocketId, sdp) => {
      peer.current[hostSocketId] = new RTCPeerConnection(CONFIG.ICE_SERVER);

      const currentPeer = peer.current[hostSocketId];

      currentPeer.setRemoteDescription(sdp);
      currentPeer.ontrack = handleOnTrack;
      currentPeer.onicecandidate = handleOnIceCandidate(hostSocketId);

      try {
        const sessionDescription = await currentPeer.createAnswer();

        currentPeer.setLocalDescription(sessionDescription);
        socketApi.answer({
          type: 'answer',
          sdp: sessionDescription,
          roomId: auctionId,
        });
      } catch (err) {
        throw new Error(err);
      }
    });

    socket.on(SOCKET_EVENT.CANDIDATE, (hostSocketId, event) => {
      const currentPeer = peer.current[hostSocketId];
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });

      currentPeer.addIceCandidate(candidate);
    });

    socket.on(SOCKET_EVENT.ROOM_BROKED_BY_HOST, () => {
      alertWarn(MESSAGE.HOST_OUT);

      dispatch(resetBroadcast());
      socketApi.leaveRoom();
      history.push(ROUTES.HOME);
    });
  };

  useEffect(() => {
    if (!isLoggedIn) return history.push(ROUTES.LOGIN);

    (async () => {
      try {
        dispatch(startBroadcast(auctionId));
        if (isHost) {
          await getUserMedia();
          subscribeAsHost();
        } else {
          subscribeAsMember();
        }
      } catch (err) {
        console.warn(err);
      }
    })();

    return () => {
      socketApi.removeAllListeners();
      stopBothVideoAndAudio(stream);
    };
  }, [isHost]);

  useEffect(() => {
    const isTimeout = timeCount === 0;
    isTimeout && handleTimeout();
  }, [timeCount]);

  useEffect(() => {
    const isHost = myAuctions.includes(auctionId);
    const currentAuction = auctions.find((auction) => {
      return auction._id === auctionId;
    });

    setCurrentAuction(currentAuction);
    setIsHost(isHost);
  }, [auctions, myAuctions, auctionId]);

  return (
    <Wrapper>
      {isModalClicked && (
        <Modal onClick={closeModal}>
          <CloseButton onClick={closeModal} />
          <AuctionDetail auction={currentAuction} />
        </Modal>
      )}
      <BroadcastBox>
        <div className='box__left'>
          <div className='box__left__video'>
            <video autoPlay ref={hostVideo} />
            <div className='box__left__img'>
              <img src={URL.BID} />
            </div>
          </div>
          <div className='box__left__status'>
            <h2 className='status__intialPrice'>시작가 {initialPrice}원</h2>
            <h2 className='status__highestBidPrice'>
              현재 경매가&nbsp;
              <span>{highestBidPrice ? highestBidPrice : initialPrice}</span>원
            </h2>
            {currentWinner?.name && (
              <h3 className='status__currentWinner'>
                현재 1등 {currentWinner.name}님 🏆
              </h3>
            )}
          </div>
          <Button
            onClick={() => setIsModalClicked(true)}
            text={'제품 상세보기'}
          />
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
                disabled={isCountButtonDisabld || !highestBidPrice}
                onClick={isCountButtonDisabld ? null : handleCountDownClick}
                width='90%'
                text={'카운트 다운 Start'}
              />
            ) : (
              <>
                <div className='box__right__bid__price'>
                  <span>₩</span>
                  <PriceBiddingInput
                    value={bidPrice}
                    onChange={(e) => handleBidPriceChange(e.target.value)}
                    placeholder={0}
                    maxLength='10'
                  />
                  <span>원</span>
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
        {isCountdownStart && (
          <TimeCountWrapper>
            <Timer duration={CONFIG.LIMITED_SECONDS} />
            {timeCount}
            <ReactAudioPlayer src={countdownSound} autoPlay controls={false} />
            <ReactAudioPlayer src={tickSound} autoPlay controls={false} />
            <ReactAudioPlayer src={backgroundSound} autoPlay controls={false} />
          </TimeCountWrapper>
        )}
        {isUserBidding && (
          <>
            <ReactAudioPlayer src={cashSound} autoPlay controls={false} />
            <ReactAudioPlayer
              src={twinkleSound}
              volume={0.5}
              autoPlay
              controls={false}
            />
          </>
        )}
      </BroadcastBox>
    </Wrapper>
  );
};

export default BroadcastContainer;
