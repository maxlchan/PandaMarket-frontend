import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`;

const BroadcastBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 90%;
  background-color: white;
  padding: 20px;

  .box__video {
    width: 59%;

    video {
      width: 100%;
      box-shadow: ${({ theme }) => theme.boxShadows.default};
    }
  }

  .box__chat {
    width: 39%;
    box-shadow: ${({ theme }) => theme.boxShadows.default};
  }
`;

const BroadcastContainer = ({ socketRef }) => {
  const hostVideo = useRef();
  const peerConnections = useRef();
  const { auctionId } = useParams();
  const userInfo = useSelector((state) => state.user.info);
  const { _id, email, name, imageUrl, myAuctions } = userInfo;
  const isHost = myAuctions.includes(auctionId);

  const getMedia = async (constraints) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const userData = { _id, email, name, imageUrl };

      hostVideo.current.srcObject = stream;

      socketRef.current.emit('create room', {
        roomId: auctionId,
        user: userData,
      });

      socketRef.current.on('member join room', (memberSocketId) => {
        peerConnections.current = {};
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
            console.log('sending ice candidate');

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
            console.log(123123);
            console.log(sessionDescription);
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

        console.log(peerConnections);
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
        console.log(peerConnections.current);
        peerConnections.current[memberSocketId].addIceCandidate(candidate);
      });
    } catch (err) {
      console.log(err.name + ': ' + err.message);
    }
  };

  useEffect(() => {
    isHost && getMedia({ audio: true, video: true });
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    const userData = { _id, email, name, imageUrl };
    socketRef.current.emit('join room', { roomId: auctionId, user: userData });

    socketRef.current.on('offer', (hostSocketId, sdp) => {
      console.log(hostSocketId, sdp);
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
          console.log('sending ice candidate');
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
      console.log(2222222222);
      console.log(peerConnections.current);
      peerConnections.current[hostSocketId].addIceCandidate(candidate);
    });
  }, [socketRef]);

  return (
    <Wrapper>
      <BroadcastBox>
        <div className='box__video'>
          <video autoPlay ref={hostVideo} />
        </div>
        <div className='box__chat'></div>
      </BroadcastBox>
    </Wrapper>
  );
};

export default BroadcastContainer;
