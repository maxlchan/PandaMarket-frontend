import io from 'socket.io-client';
import { SOCKET_EVENT } from '../constants';

export const socket = io.connect(process.env.REACT_APP_SERVER_BASE_URL);

export const socketApi = {
  createRoom: (payload) => {
    socket.emit(SOCKET_EVENT.CREATE_ROOM, payload);
  },
  joinRoom: (payload) => {
    socket.emit(SOCKET_EVENT.JOIN_ROOM, payload);
  },
  leaveRoom: () => {
    socket.emit(SOCKET_EVENT.LEAVE_ROOM);
  },
  offer: (socketId, payload) => {
    socket.emit(SOCKET_EVENT.OFFER, socketId, payload);
  },
  answer: (payload) => {
    socket.emit(SOCKET_EVENT.ANSWER, payload);
  },
  candidate: (socketId, payload) => {
    socket.emit(SOCKET_EVENT.CANDIDATE, socketId, payload);
  },
  sendMessage: (message) => {
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, message);
  },
  sendPrivateMessage: (message) => {
    socket.emit(SOCKET_EVENT.SEND_PRIVATE_MESSAGE, message);
  },
  updateHighestBid: (bidPrice) => {
    socket.emit(SOCKET_EVENT.UPDATE_HIGHEST_BID_PRICE, bidPrice);
  },
  countdown: (limitedSeconds) => {
    socket.emit(SOCKET_EVENT.COUNTDOWN, limitedSeconds);
  },
  finishBroadcast: () => {
    socket.emit(SOCKET_EVENT.FINISH_BROADCAST);
  },
  removeAllListeners: () => {
    socket.removeAllListeners();
  },
};
