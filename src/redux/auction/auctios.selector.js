import { createSelector } from 'reselect';

const auctionsSelector = (state) => state.auctions.data;

export const auctionsOnWaitingSelector = createSelector(
  auctionsSelector,
  (data) => {
    return data.filter((auctionData) => !auctionData.isStarted);
  }
);

export const auctionsOnAirSelector = createSelector(
  auctionsSelector,
  (data) => {
    return data.filter((auctionData) => auctionData.isStarted);
  }
);
