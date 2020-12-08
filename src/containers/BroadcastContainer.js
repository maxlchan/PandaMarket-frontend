import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatUnit from '../components/ChatUnit';
import ChatInput from '../components/ChatInput';
import Button from '../components/Button';
import UserIcon from '../components/UserIcon';
import themes from '../styles/themes';
import { MESSAGE, ROUTES } from '../constants';
import { socket } from '../utils/socket';
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
  const hostVideo = useRef();
  const peerConnections = useRef();
  const messagesEndRef = useRef();

  const { auctionId } = useParams();
  const { isLoggedIn, info: userInfo } = useSelector((state) => state.user);
  const [hightestBidPrice, setHighestBidPrice] = useState(0);
  const [memberNumber, setMemberNumber] = useState(0);
  const [currentWinner, setCurrentWinner] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const { _id, email, name, imageUrl, myAuctions } = userInfo;
  const isHost = myAuctions.includes(auctionId);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleBidButtonClick = () => {
    if (bidPrice <= hightestBidPrice) {
      alert(MESSAGE.INVAILD_BIDDING);

      return;
    }

    socket.emit('update highest bid price', bidPrice);
  };

  const handleChatButtonClick = () => {
    if (!message) return;
    socket.emit('send message', message, auctionId);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (!message) return;
    if (e.key === 'Enter') {
      socket.emit('send message', message, auctionId);
      setMessage('');
    }
  };

  const handleBidInputChange = (e) => {
    setBidPrice(e.target.value);
  };

  const getMedia = async (constraints) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const userData = { _id, email, name, imageUrl };

      hostVideo.current.srcObject = stream;

      socket.emit('create room', {
        roomId: auctionId,
        user: userData,
      });

      socket.on('send message', (messages) => {
        setMessages(messages);
      });

      socket.on('update highest bid price', (price, name) => {
        setHighestBidPrice(price);
        setCurrentWinner(name);
      });

      socket.on('member join room', (memberSocketId, member) => {
        if (!peerConnections.current) peerConnections.current = {};

        peerConnections.current[memberSocketId] = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:stun.stunprotocol.org' },
            {
              urls: 'turn:numb.viagenie.ca',
              credential: 'muazkh',
              username: 'webrtc@live.com',
            },
          ],
        });

        const stream = hostVideo.current.srcObject;

        stream
          .getTracks()
          .forEach((track) =>
            peerConnections.current[memberSocketId].addTrack(track, stream)
          );

        peerConnections.current[memberSocketId].onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('candidate', memberSocketId, {
              type: 'candidate',
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate,
            });
          }
        };

        peerConnections.current[memberSocketId]
          .createOffer()
          .then((sessionDescription) => {
            peerConnections.current[memberSocketId].setLocalDescription(
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
        peerConnections.current[memberSocketId].setRemoteDescription(
          new RTCSessionDescription(event)
        );
      });

      socket.on('candidate', (memberSocketId, event) => {
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: event.label,
          candidate: event.candidate,
        });

        peerConnections.current[memberSocketId].addIceCandidate(candidate);
      });

      socket.on('member leave room', (memberSocketId, name) => {
        delete peerConnections?.current[memberSocketId];
        console.log(`${name}이 나가셨습니다.`);
      });
    } catch (err) {
      console.log(err.name + ': ' + err.message);
    }
  };

  useEffect(() => {
    isHost && getMedia({ audio: true, video: true });

    return () => socket.removeAllListeners();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (isHost) return;

    const userData = { _id, email, name, imageUrl };
    console.log(12313);
    socket.emit(
      'join room',
      { roomId: auctionId, user: userData },
      (
        currentMessages,
        currentHighestPrice,
        currentWinner,
        currnetMemberNumber
      ) => {
        setMessages(currentMessages);
        setHighestBidPrice(currentHighestPrice);
        setCurrentWinner(currentWinner);
        setMemberNumber(currnetMemberNumber);
      }
    );

    socket.on('send message', (messages) => {
      setMessages(messages);
    });

    socket.on('update highest bid price', (price, name) => {
      setHighestBidPrice(price);
      setCurrentWinner(name);
    });

    socket.on('offer', (hostSocketId, sdp) => {
      peerConnections.current = {};
      peerConnections.current[hostSocketId] = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.stunprotocol.org' },
          {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com',
          },
        ],
      });

      peerConnections.current[hostSocketId].setRemoteDescription(sdp);

      peerConnections.current[hostSocketId]
        .createAnswer()
        .then((sessionDescription) => {
          peerConnections.current[hostSocketId].setLocalDescription(
            sessionDescription
          );

          socket.emit('answer', {
            type: 'answer',
            sdp: sessionDescription,
            roomId: auctionId,
          });
        });

      peerConnections.current[hostSocketId].ontrack = (event) => {
        hostVideo.current.srcObject = event.streams[0];
      };

      peerConnections.current[hostSocketId].onicecandidate = (event) => {
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
      peerConnections.current[hostSocketId].addIceCandidate(candidate);
    });

    socket.on('room broked by host', () => {
      alert('방장님이 나가셨습니다.');

      socket.emit('leave room', auctionId);
      history.push(ROUTES.HOME);
    });

    return () => socket.removeAllListeners();
  }, []);

  return (
    <Wrapper>
      <BroadcastBox>
        <div className='box__left'>
          <video autoPlay ref={hostVideo} />
          <div className='box__left__status'>
            <h2>시작가 {3000}</h2>
            <h2>현재 경매가 {hightestBidPrice}</h2>
            <h3>현재 1등 {currentWinner}님</h3>
          </div>
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
            />
          </div>
        </div>
      </BroadcastBox>
    </Wrapper>
  );
};

export default BroadcastContainer;
