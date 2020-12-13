import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuctionDetail from '../components/AuctionDetail';
import ChatBox from '../components/ChatBox';
import Modal from '../components/Modal';
import CloseButton from '../components/CloseButton';
import Button from '../components/Button';
import {
  userRequiredInRoomSelector,
  userInfoSelector,
} from '../redux/user/user.selector';
import { broadcastSelectorForAuction } from '../redux/broadcast/broadcast.selector';
import {
  resetBroadcast,
  setBroadcast,
  startCountdown,
  finishBroadcast,
  startBroadcast,
} from '../redux/broadcast/broadcast.reducer';
import { checkIsBigger, stopBothVideoAndAudio, unitizedValue } from '../utils';
import { socket, socketApi } from '../utils/socket';
import { CONFIG, MESSAGE, ROUTES, SOCKET_EVENT } from '../constants';

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
  const { isLoading } = useSelector((state) => state.broadcast);
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
  const initialPrice = currentAuction?.initialPrice;

  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const hostVideo = useRef();
  const peer = useRef({});
  let stream;

  const handleBidButtonClick = () => {
    if (highestBidPrice) {
      const isLowerThanHightestPrice = !checkIsBigger(
        bidPrice,
        highestBidPrice
      );
      if (isLowerThanHightestPrice) return alert(MESSAGE.LOWER_THAN_HIGHTEST);
    } else {
      const isLowerThanInitalPrice = !checkIsBigger(bidPrice, initialPrice);
      if (isLowerThanInitalPrice) return alert(MESSAGE.LOWER_THAN_INITIAL);
    }

    socketApi.updateHighestBid(bidPrice);
  };

  const handleChatButtonClick = () => {
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
    dispatch(startCountdown());
    socketApi.countdown(CONFIG.LIMITED_SECONDS);
  };

  const handleTimeout = () => {
    const isWinner = currentWinner._id === userId;

    if (isHost) {
      alert(MESSAGE.BROADCAST_END_HOST);
    } else if (isWinner) {
      alert(MESSAGE.BROADCAST_END_WINNER);
    } else {
      dispatch(resetBroadcast());
      socketApi.leaveRoom();
      alert(MESSAGE.BROADCAST_END_MEMBER);
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

  const closeModal = () => setIsModalClicked(false);

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
    socketApi.createRoom({
      roomId: auctionId,
      user: userRequiredInRoom,
    });

    socket.on(SOCKET_EVENT.CHANGE_ROOM_STATUS, (payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on(
      SOCKET_EVENT.MEMBER_JOIN_ROOM,
      (memberSocketId, member, payload) => {
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
            socketApi.candidate(memberSocketId, {
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
            socketApi.offer(memberSocketId, {
              type: 'offer',
              sdp: sessionDescription,
            });
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(`${member.name}님이 들어오셨습니다.`);
      }
    );

    socket.on(SOCKET_EVENT.ANSWER, (memberSocketId, event) => {
      peer.current[memberSocketId].setRemoteDescription(
        new RTCSessionDescription(event)
      );
    });

    socket.on(SOCKET_EVENT.CANDIDATE, (memberSocketId, event) => {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });

      peer.current[memberSocketId].addIceCandidate(candidate);
    });

    socket.on(SOCKET_EVENT.LEAVE_ROOM, (memberSocketId, name, payload) => {
      delete peer.current[memberSocketId];
      dispatch(setBroadcast(payload));
      console.log(`${name}이 나가셨습니다.`);
    });
  };

  const subscribeAsMember = () => {
    socketApi.joinRoom({ roomId: auctionId, user: userRequiredInRoom });

    socket.on(SOCKET_EVENT.MEMBER_JOIN_ROOM, (_, __, payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on(SOCKET_EVENT.CHANGE_ROOM_STATUS, (payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on(SOCKET_EVENT.LEAVE_ROOM, (_, __, payload) => {
      dispatch(setBroadcast(payload));
    });

    socket.on(SOCKET_EVENT.OFFER, (hostSocketId, sdp) => {
      peer.current[hostSocketId] = new RTCPeerConnection(CONFIG.ICE_SERVER);
      peer.current[hostSocketId].setRemoteDescription(sdp);
      peer.current[hostSocketId].createAnswer().then((sessionDescription) => {
        peer.current[hostSocketId].setLocalDescription(sessionDescription);

        socketApi.answer({
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
          socketApi.candidate(hostSocketId, {
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          });
        }
      };
    });

    socket.on(SOCKET_EVENT.CANDIDATE, (hostSocketId, event) => {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });

      peer.current[hostSocketId].addIceCandidate(candidate);
    });

    socket.on(SOCKET_EVENT.ROOM_BROKED_BY_HOST, () => {
      alert(MESSAGE.HOST_OUT);

      dispatch(resetBroadcast());
      socketApi.leaveRoom();
      history.push(ROUTES.HOME);
    });
  };

  useEffect(() => {
    if (!isLoggedIn) return history.push(ROUTES.LOGIN);
    if (isHost) {
      (async () => {
        dispatch(startBroadcast(auctionId));

        await getUserMedia();
        subscribeAsHost();
      })();
    } else {
      subscribeAsMember();
    }

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
    const currentAuction = auctions.find(
      (auction) => auction._id === auctionId
    );

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
          <video autoPlay ref={hostVideo} />
          <div className='box__left__status'>
            <h2 className='status__intialPrice'>시작가 - {initialPrice}원</h2>
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
                disabled={!highestBidPrice || isCountdownStart}
                onClick={handleCountDownClick}
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
      </BroadcastBox>
    </Wrapper>
  );
};

export default BroadcastContainer;
