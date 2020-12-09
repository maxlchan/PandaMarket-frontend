import { createSelector } from 'reselect';

const broadcastSelector = (state) => state.broadcast;

export const broadcastSelectorForAuction = createSelector(
  broadcastSelector,
  (broadcast) => ({
    highestBidPrice: broadcast.highestBidPriceList.slice(-1)[0],
    currentWinner: broadcast.winnerList.slice(-1)[0],
    memberNumber: broadcast.members.length,
    messages: broadcast.messages,
    isCountdownStart: broadcast.isCountdownStart,
    timeCount: broadcast.timeCount,
  })
);
