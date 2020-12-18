import { createSelector } from 'reselect';
import { userInfoSelector } from '../user/user.selector';

export const isAuctionsLoadingSelector = (state) => state.auctions.isLoading;
export const auctionsSelector = (state) => state.auctions.data;

export const auctionsOnWaitingSelector = createSelector(
  auctionsSelector,
  (data) => data?.filter(({ isStarted }) => !isStarted)
);

export const auctionsOnAirSelector = createSelector(auctionsSelector, (data) =>
  data?.filter(({ isFinished, isStarted }) => !isFinished && isStarted)
);

export const myAuctionsSelector = createSelector(
  auctionsSelector,
  userInfoSelector,
  (data, info) => data.filter(({ host: hostId }) => hostId === info._id)
);

export const reservedAuctionsSelector = createSelector(
  auctionsSelector,
  userInfoSelector,
  (data, info) => {
    const reservedAuctions = [];
    const reservedAuctionIds = info.reservedAuctions;

    for (let i = 0; i < reservedAuctionIds.length; i++) {
      const reservedAuctionId = reservedAuctionIds[i];

      for (let j = 0; j < data.length; j++) {
        const currentAutions = data[j];

        if (currentAutions._id === reservedAuctionId) {
          reservedAuctions.push(currentAutions);

          break;
        }
      }
    }

    return reservedAuctions;
  }
);
