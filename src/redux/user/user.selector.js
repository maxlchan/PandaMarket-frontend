import { createSelector } from 'reselect';

export const isUserLoggedInSelector = (state) => state.user.isLoggedIn;
export const isUserLoadingSelector = (state) => state.user.isLoading;
export const userInfoSelector = (state) => state.user.info;

export const userRequiredInRoomSelector = createSelector(
  userInfoSelector,
  (info) => ({
    _id: info._id,
    name: info.name,
    imageUrl: info.imageUrl,
  })
);
