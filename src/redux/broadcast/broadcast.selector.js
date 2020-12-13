import { createSelector } from 'reselect';

const broadcastSelector = (state) => state.broadcast;

export const broadcastSelectorForAuction = createSelector(
  broadcastSelector,
  (broadcast) => ({
    highestBidPrice: broadcast.highestBidPriceList.slice(-1)[0],
    currentWinner: broadcast.winnerList.slice(-1)[0],
    memberNumber: broadcast.members.length,
    privateMessages: broadcast.privateMessages,
    messages: broadcast.messages,
    isCountdownStart: broadcast.isCountdownStart,
    isFinished: broadcast.isFinished,
    timeCount: broadcast.timeCount,
  })
);
