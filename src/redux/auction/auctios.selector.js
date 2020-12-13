import { createSelector } from 'reselect';
import { userInfoSelector } from '../user/user.selector';

const auctionsSelector = (state) => state.auctions.data;

export const auctionsOnWaitingSelector = createSelector(
  auctionsSelector,
  (data) => data?.filter((auctionData) => !auctionData.isStarted)
);

export const auctionsOnAirSelector = createSelector(auctionsSelector, (data) =>
  data?.filter((auctionData) => auctionData.isStarted)
);

export const myAuctionsSelector = createSelector(
  auctionsSelector,
  userInfoSelector,
  (data, info) => data.filter((auctionData) => auctionData.host === info._id)
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
