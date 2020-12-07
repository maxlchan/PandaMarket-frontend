import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatUnit from '../components/ChatUnit';
import ChatInput from '../components/ChatInput';
import Button from '../components/Button';
import themes from '../styles/themes';
import { MESSAGE, ROUTES } from '../constants';
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
  justify-content: space-evenly;
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
      width: 100%;
      height: 10%;
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

const BroadcastContainer = ({ socketRef }) => {
  const hostVideo = useRef();
  const peerConnections = useRef();
  const { auctionId } = useParams();
  const userInfo = useSelector((state) => state.user.info);
  const { _id, email, name, imageUrl, myAuctions } = userInfo;
  const isHost = myAuctions.includes(auctionId);
  const history = useHistory();
  const [hightestBidPrice, setHighestBidPrice] = useState(0);
  const [currentBidPrice, setCurrentBidPrice] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, []);

  const handleBidButtonClick = () => {
    if (currentBidPrice <= hightestBidPrice) {
      alert(MESSAGE.INVAILD_BIDDING);

      return;
    }

    setHighestBidPrice(currentBidPrice);
  };

  const handleBidInputChange = (e) => {
    setCurrentBidPrice(e.target.value);
  };

  const getMedia = async (constraints) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const userData = { _id, email, name, imageUrl };

      hostVideo.current.srcObject = stream;

      socketRef.current.emit('create room', {
        roomId: auctionId,
        user: userData,
      });

      socketRef.current.on('member join room', (memberSocketId, member) => {
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
            socketRef.current.emit('candidate', memberSocketId, {
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

            socketRef.current.emit('offer', memberSocketId, {
              type: 'offer',
              sdp: sessionDescription,
            });
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(`${member.name}님이 들어오셨습니다.`);
      });

      socketRef.current.on('answer', (memberSocketId, event) => {
        peerConnections.current[memberSocketId].setRemoteDescription(
          new RTCSessionDescription(event)
        );
      });

      socketRef.current.on('candidate', (memberSocketId, event) => {
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: event.label,
          candidate: event.candidate,
        });

        peerConnections.current[memberSocketId].addIceCandidate(candidate);
      });

      socketRef.current.on('member leave room', (memberSocketId, name) => {
        delete peerConnections.current[memberSocketId];
        console.log(`${name}이 나가셨습니다.`);
      });
    } catch (err) {
      console.log(err.name + ': ' + err.message);
    }
  };

  useEffect(() => {
    isHost && getMedia({ audio: true, video: true });

    return () => socketRef.current.removeAllListeners();
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    const userData = { _id, email, name, imageUrl };
    socketRef.current.emit('join room', { roomId: auctionId, user: userData });

    socketRef.current.on('offer', (hostSocketId, sdp) => {
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

          socketRef.current.emit('answer', {
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
          socketRef.current.emit('candidate', hostSocketId, {
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          });
        }
      };
    });

    socketRef.current.on('candidate', (hostSocketId, event) => {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });
      peerConnections.current[hostSocketId].addIceCandidate(candidate);
    });

    socketRef.current.on('room broked by host', () => {
      alert('방장님이 나가셨습니다.');

      socketRef.current.emit('leave room', auctionId);
      history.push(ROUTES.HOME);
    });

    return () => socketRef.current.removeAllListeners();
  }, [socketRef]);

  return (
    <Wrapper>
      <BroadcastBox>
        <div className='box__left'>
          <video autoPlay ref={hostVideo} />
          <div className='box__left__status'>
            <h2>시작가 {currentBidPrice}</h2>
            <h2>현재 경매가 {hightestBidPrice}</h2>
            <h3>현재 1등 {'김찬중'}님</h3>
          </div>
        </div>
        <div className='box__right'>
          <div className='box__right__allchat'>
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={
                '암ㅇ미어sadasdasㅁㄴㅇㅁㄴㅇㅁㅇㄴㅁㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴdadasdㅇㄴㅁㅇㅁㄴㅣㅏㅁ엄'
              }
            />

            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />
            <ChatUnit
              photoUrl={
                'https://lh3.googleusercontent.com/a-/AOh14GiEdbNXVArUetJIPu_u0NEXQU8ngBe5VwzK1ywQ=s96-c'
              }
              name={'김찬중'}
              text={'암ㅇ미어ㅣㅏㅁ엄'}
            />

            <div ref={messagesEndRef} />
          </div>
          <div className='box__right__mychat'>
            <ChatInput />
            <Button color={COLORS.indigo} text={'전송'} />
          </div>
          <div className='box__right__bid'>
            <div className='box__right__bid__price'>
              <span>₩</span>
              <PriceBiddingInput
                type='number'
                value={currentBidPrice}
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
